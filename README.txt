MBCC Meeting Automator — Upgraded
=================================
This build adds:
- Google Calendar draft button (opens pre-filled event in Google Calendar)
- URL pre-fill (open the tool with querystring params to auto-populate)

Install
-------
1) Upload `meeting-automator.html` and the entire `assets/` folder to your site root (same level as apps.html).
2) In `apps.html`, paste the contents of `apps-card-snippet.html` into your app grid/card list.
3) Hard refresh the site after deploy.

Google Calendar Draft
---------------------
Button text: "Google Calendar draft"
It uses your current title, start/end (UTC), attendees (comma-separated), location, and details (agenda/notes).
No backend required.

URL Pre-fill
------------
Example:
/meeting-automator.html?title=Weekly+Sync&organizer=you%40company.com&date=2025-09-09T15:00&duration=45&location=Zoom&attendees=a%40ex.com,b%40ex.com&agenda=Kickoff:5|Roadmap:15|Q%26A:10

Params:
- title, organizer, date (YYYY-MM-DDTHH:MM), duration (minutes), location
- attendees = comma-separated emails
- agenda = pipe-separated "Topic:mins" items

Files
-----
- meeting-automator.html
- assets/meeting.css
- assets/meeting.js
- assets/plaid.svg
- apps-card-snippet.html
