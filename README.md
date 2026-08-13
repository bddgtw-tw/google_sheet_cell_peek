# google_sheet_cell_peek

An experimental Chrome extension for reading and editing long Google Sheets cell content without expanding rows or columns.

## Features

- Click a cell to show its full content.
- Copy the content with one click.
- Adjust preview text size with `+` and `-`.
- Show an estimated half-width character count.
- Edit the content and save it back to the selected cell.
- Enable or disable the feature from the Chrome toolbar popup.

## Installation

1. Download or unzip this project.
2. Open `chrome://extensions` in Chrome.
3. Enable Developer mode.
4. Select **Load unpacked**.
5. Select the project folder.

## Permission explanation

The extension only runs on `docs.google.com/spreadsheets/*` pages.

The `debugger` permission is required because Google Sheets renders its grid mainly with Canvas. A normal content script cannot reliably identify and read the selected cell. The extension uses Chrome's Debugger API to send click and editing actions to the current Google Sheets tab and read the selected cell content.

The extension does not upload spreadsheet content to an external server and has no backend service.

## Project status

This is an experimental MVP for personal sharing. The goal is to learn whether this workflow helps other Google Sheets users before investing in a larger release.

## Feedback

Please include your browser version, the Google Sheets situation, any error message, and the feature you would like to see next.

## Project files

- `PRIVACY.md` - local data handling and permission explanation
- `CONTRIBUTING.md` - safe issue and contribution guidelines
- `STORE_LISTING.md` - draft Chrome Web Store listing copy
- `LICENSE` - MIT License
