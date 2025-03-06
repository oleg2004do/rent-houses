export default function Head() {
    return (
      <>
        <title>Journey UA</title>
        <meta name="description" content="Find your dream home with Journey UA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/JOURNEY-UA.png" />
        <link rel="shortcut icon" href="/JOURNEY-UA.png" />
        <link rel="apple-touch-icon" href="/JOURNEY-UA.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              var link = document.querySelector('link[rel="icon"]');
              if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                link.type = 'image/png';
                document.head.appendChild(link);
              }
              link.href = '/JOURNEY-UA.png?v=' + Date.now();
            })();
          `,
          }}
        />
      </>
    )
  }
  
  