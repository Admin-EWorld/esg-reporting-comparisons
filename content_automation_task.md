# Content Automation Task - ESG Site

The goal is to autonomously generate new content for the ESG Comparison Site, commit it to Git, and trigger the GitHub Pages deployment.

**CONFIGURATION:**
- **REPO_PATH:** /home/ubuntu/.openclaw/workspace/esg-reports-site
- **KEYWORDS_FILE:** /home/ubuntu/.openclaw/workspace/keywords.txt

**EXECUTION STEPS:**

1. **Check Keyword Availability:**
   - Read lines from `${KEYWORDS_FILE}`. Extract the first keyword.

2. **Generate New Content:**
   - Research the keyword (Comparison of 3-5 software vendors).
   - Format as Markdown.
   - Save to `${REPO_PATH}/content/posts/${FILE_NAME}.md`.

3. **Commit & Push (Triggers GitHub Pages Build):**
   - `cd ${REPO_PATH}`
   - `git add .`
   - `git commit -m "AUTOGEN: New article: ${KEYWORD}"`
   - `git push origin main`

4. **Update Keyword List:**
   - Remove the processed keyword from `${KEYWORDS_FILE}`.

5. **Final Announcement:**
   - Report the keyword processed and the Git push status. (Netlify is no longer used).
