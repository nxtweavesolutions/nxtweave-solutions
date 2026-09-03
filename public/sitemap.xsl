<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
    xmlns:html="http://www.w3.org/TR/REC-html40"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>NxtWeave Solutions — XML Sitemap</title>
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
            max-width: 1000px;
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
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          th {
            background: #ffffff;
            text-align: left;
            padding: 14px 24px;
            font-weight: 700;
            color: #0f172a;
            border-bottom: 2px solid #e2e8f0;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.5px;
          }
          td {
            padding: 14px 24px;
            border-bottom: 1px solid #f1f5f9;
            color: #334155;
          }
          tr:hover td {
            background-color: #f8fafc;
          }
          a {
            color: #1d4ed8;
            text-decoration: none;
            font-weight: 500;
          }
          a:hover {
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            background: #dbeafe;
            color: #1e40af;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>NxtWeave Solutions — XML Sitemap</h1>
            <p>Official Indexable URL directory generated for Google, Bing, and Search Engine Crawlers.</p>
          </div>
          <div class="stats-bar">
            <span>Total URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
            <span>Canonical Domain: www.nxtweavesolutions.com</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>URL Location</th>
                <th>Priority</th>
                <th>Change Frequency</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td style="color:#94a3b8; font-weight:600;"><xsl:value-of select="position()"/></td>
                  <td>
                    <a href="{sitemap:loc}" target="_blank">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <span class="badge">
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </td>
                  <td style="text-transform: capitalize;">
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td style="color:#64748b;">
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
