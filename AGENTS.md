# ReaderPub Modified Site Notes

- The active ReaderPub website for this work is `/Users/anatoly/Dropbox/production/reader.pub/website_alt`.
- Work only inside `/Users/anatoly/Dropbox/production/reader.pub/website_alt`.
- Never run, serve, edit, or deploy this modified site from `/Users/anatoly/Dropbox/production/reader.pub/website_new_modified`.
- The local preview for this site must be started from `/Users/anatoly/Dropbox/production/reader.pub/website_alt`.
- In Hero sections, problem copy uses the black Hero paragraph style and solution copy uses the green Hero paragraph style.
- The black Hero problem paragraph must be 10% smaller than the green Hero solution paragraph across pages and breakpoints.
- In visible English copy, when a colon is followed by more text in the same heading or line, render exactly two spaces after the colon. Use two non-breaking spaces or a CSS `::after` rule when component boundaries would collapse normal spaces.
- A direct user instruction defines the required outcome. Do not let shared styles, existing abstractions, or general rules override it; verify the result itself, not merely that a code change was made.
- For any request about geometry—spacing, size, alignment, or position—the required outcome is the rendered visual result. Verify it on the live page; a source-code change alone does not satisfy the request.
- Before telling the user that any website change is ready or complete, verify the visible result in the browser at the local preview URL. For visual or interaction changes, source inspection, computed styles, and build output are not sufficient on their own.
