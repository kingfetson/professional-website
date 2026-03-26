// ============================================================
//  Plumbing Experts Nairobi — Code.gs
//  Google Apps Script Web App — Sheets Integration Backend
// ============================================================
//
//  HOW TO DEPLOY (one-time setup, ~5 minutes):
//
//  1. Open Google Sheets → create a new spreadsheet.
//     Name it "Plumbing Experts – Leads".
//
//  2. Open the Apps Script editor:
//     Extensions → Apps Script
//
//  3. Delete any existing code and paste THIS entire file.
//
//  4. Set your Sheet name (default: "Leads") — see SHEET_NAME below.
//
//  5. Click Deploy → New Deployment:
//       Type      → Web App
//       Execute as → Me
//       Who has access → Anyone
//     Click Deploy → copy the Web App URL.
//
//  6. Paste that URL into script.js as SHEETS_WEBHOOK_URL.
//
//  7. Done! Every form submission now writes a new row.
// ============================================================

// ─── CONFIGURATION ───────────────────────────────────────────
var SHEET_NAME      = 'Leads';          // Tab name inside your spreadsheet
var NOTIFY_EMAIL    = '';               // Optional: your email for new-lead alerts (or leave blank)
var EMAIL_SUBJECT   = '🔧 New Plumbing Lead';
// ─────────────────────────────────────────────────────────────

/**
 * Handles POST requests from the website contact form.
 * Apps Script calls this automatically when the Web App receives a POST.
 */
function doPost(e) {
  try {
    var params = e.parameter;

    // ── Grab submitted fields ───────────────────────────────
    var name        = params.name        || '';
    var phone       = params.phone       || '';
    var issue       = params.issue       || 'Not specified';
    var message     = params.message     || '—';
    var submittedAt = params.submittedAt || new Date().toLocaleString();
    var pageUrl     = params.pageUrl     || '—';
    var userAgent   = params.userAgent   || '—';

    // ── Basic server-side validation ────────────────────────
    if (!name || !phone) {
      return jsonResponse({ result: 'error', error: 'Name and phone are required.' });
    }

    // ── Write row to Google Sheet ───────────────────────────
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Create the sheet + header row if it doesn't exist yet
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp (Nairobi)',
        'Full Name',
        'Phone',
        'Issue Type',
        'Message',
        'Status',
        'Page URL',
        'User Agent',
      ]);

      // Style the header row
      var header = sheet.getRange(1, 1, 1, 8);
      header.setFontWeight('bold');
      header.setBackground('#0b1120');
      header.setFontColor('#ffffff');
      sheet.setFrozenRows(1);
      sheet.setColumnWidths(1, 8, 180);
    }

    // Append the new lead row
    sheet.appendRow([
      submittedAt,
      name,
      phone,
      issue,
      message,
      'New',           // Default status — update manually to "Called", "Booked", etc.
      pageUrl,
      userAgent,
    ]);

    // ── Optional email notification ─────────────────────────
    if (NOTIFY_EMAIL) {
      var body =
        'New plumbing service request received:\n\n' +
        'Name    : ' + name        + '\n' +
        'Phone   : ' + phone       + '\n' +
        'Issue   : ' + issue       + '\n' +
        'Message : ' + message     + '\n' +
        'Time    : ' + submittedAt + '\n\n' +
        'Open sheet: ' + ss.getUrl();

      MailApp.sendEmail(NOTIFY_EMAIL, EMAIL_SUBJECT, body);
    }

    // ── Return success ──────────────────────────────────────
    return jsonResponse({ result: 'success' });

  } catch (err) {
    Logger.log('doPost error: ' + err.message);
    return jsonResponse({ result: 'error', error: err.message });
  }
}


/**
 * Handles GET requests (e.g. browser test / health check).
 * Visit your Web App URL in a browser to confirm it's live.
 */
function doGet() {
  return HtmlService.createHtmlOutput(
    '<h2 style="font-family:sans-serif;color:#1d6ef5">✓ Plumbing Experts – Sheets Webhook is Live</h2>' +
    '<p style="font-family:sans-serif">POST form data here to log leads.</p>'
  );
}


/**
 * Helper: return a JSON ContentService response with CORS headers.
 * This allows the browser fetch() in script.js to read the response.
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
