import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update <head>
head_seo = """    <meta name="theme-color" content="#0f172a">
    <title>1997 Barber - Men's Grooming Studio</title>
    
    <!-- SEO & Social Media -->
    <link rel="canonical" href="https://1997barber.com/" />
    <link rel="icon" type="image/png" href="./img/image.png" />
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://1997barber.com/">
    <meta property="og:title" content="1997 Barber - Men's Grooming Studio">
    <meta property="og:description" content="1997 Barber - Men's Grooming Studio. Modern barber shop with skilled barbers, quick online booking, and no hidden fees.">
    <meta property="og:image" content="https://1997barber.com/img/image.png">

    <!-- Schema Markup (LocalBusiness) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Barbershop",
      "name": "1997 Barber",
      "image": "https://1997barber.com/img/image.png",
      "url": "https://1997barber.com",
      "telephone": "+15105010274",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "24654 Joyce street",
        "addressLocality": "Hayward",
        "postalCode": "94544",
        "addressCountry": "US"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Tuesday", "Wednesday"
        ],
        "opens": "09:00",
        "closes": "20:00"
      }
    }
    </script>"""

html = html.replace('    <meta name="theme-color" content="#0f172a">\n    <title>1997 Barber - Men\'s Grooming Studio</title>', head_seo)

# 2. Add alt="1997 Barber shop space" to img tags that don't have an alt attribute
def add_alt(match):
    tag = match.group(0)
    # if it doesn't have alt= somewhere in the string
    if 'alt=' not in tag and 'alt =' not in tag:
        # insert before the closing >
        # Note: some img tags end with />, some with >
        if tag.endswith('/>'):
            tag = tag[:-2] + ' alt="1997 Barber shop space" />'
        else:
            tag = tag[:-1] + ' alt="1997 Barber shop space">'
    return tag

html = re.sub(r'<img[^>]+>', add_alt, html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
