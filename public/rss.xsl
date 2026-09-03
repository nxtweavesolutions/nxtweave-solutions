<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
    xmlns:html="http://www.w3.org/TR/REC-html40"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>NxtWeave Solutions — RSS Feed &amp; Article Updates</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 900px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #0B1F3A 0%, #1D4ED8 100%);
            color: #ffffff;
            padding: 32px;
          }
          .header h1 {
            margin: 0 0 8px 0;
            font-size: 26px;
            font-weight: 800;
            letter-spacing: -0.5px;
          }
          .header p {
            margin: 0;
            font-size: 14px;
            color: #93c5fd;
          }
          .stats-bar {
            padding: 16px 32px;
            background: #f1f5f9;
            border-bottom: 1px solid #e2e8f0;
            font-size: 13px;
            font-weight: 600;
            color: #475569;
            display: flex;
            justify-content: space-between;
          }
          .article-list {
            padding: 24px 32px;
          }
          .article-card {
            padding: 20px 0;
            border-bottom: 1px solid #f1f5f9;
          }
          .article-card:last-child {
            border-bottom: none;
          }
          .article-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 8px;
          }
          .category-badge {
            background: #eff6ff;
            color: #1d4ed8;
            padding: 2px 10px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: 1px solid #bfdbfe;
          }
          .pub-date {
            font-size: 12px;
            color: #94a3b8;
          }
          .article-title {
            margin: 0 0 8px 0;
            font-size: 17px;
            font-weight: 700;
            line-height: 1.4;
          }
          .article-title a {
            color: #0f172a;
            text-decoration: none;
          }
          .article-title a:hover {
            color: #1d4ed8;
            text-decoration: underline;
          }
          .article-desc {
            margin: 0 0 12px 0;
            font-size: 13px;
            color: #64748b;
            line-height: 1.6;
          }
          .read-link {
            font-size: 12px;
            font-weight: 700;
            color: #1d4ed8;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }
          .read-link:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>NxtWeave Solutions — Live RSS Article Feed</h1>
            <p>Syndicated news, statutory compliance updates, and startup business blueprints.</p>
          </div>
          <div class="stats-bar">
            <span>Total Guides: <xsl:value-of select="count(rss/channel/item)"/></span>
            <span>Feed Protocol: RSS 2.0</span>
          </div>
          <div class="article-list">
            <xsl:for-each select="rss/channel/item">
              <div class="article-card">
                <div class="article-meta">
                  <span class="category-badge">
                    <xsl:value-of select="category"/>
                  </span>
                  <span class="pub-date">
                    <xsl:value-of select="pubDate"/>
                  </span>
                </div>
                <h2 class="article-title">
                  <a href="{link}" target="_blank">
                    <xsl:value-of select="title"/>
                  </a>
                </h2>
                <p class="article-desc">
                  <xsl:value-of select="description"/>
                </p>
                <a href="{link}" target="_blank" class="read-link">
                  Read Full Manual &#8594;
                </a>
              </div>
            </xsl:for-each>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
