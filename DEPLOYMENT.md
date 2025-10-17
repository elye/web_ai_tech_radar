# Deployment Guide - AI Technology Radar

This guide covers various deployment options for your AI Technology Radar.

## Table of Contents
1. [GitHub Pages](#github-pages)
2. [Netlify](#netlify)
3. [Vercel](#vercel)
4. [AWS S3](#aws-s3)
5. [Azure Static Web Apps](#azure-static-web-apps)
6. [Cloudflare Pages](#cloudflare-pages)
7. [Custom Domain](#custom-domain)

---

## 🚀 GitHub Pages

**Difficulty:** ⭐ Easy  
**Cost:** Free  
**Best for:** Personal projects, open source

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI Technology Radar"
   git remote add origin https://github.com/yourusername/ai-tech-radar.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select your `main` branch
   - Click **Save**

3. **Access Your Radar**
   - Your site will be available at: `https://yourusername.github.io/ai-tech-radar/`
   - Initial deployment takes 1-2 minutes

### Custom Domain (Optional)

1. Add a `CNAME` file in your repository:
   ```bash
   echo "radar.yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. Configure DNS:
   - Add a CNAME record pointing to `yourusername.github.io`

---

## 🎯 Netlify

**Difficulty:** ⭐ Easy  
**Cost:** Free (with limits)  
**Best for:** Quick deployments, automatic builds

### Method 1: Drag & Drop

1. Visit [Netlify Drop](https://app.netlify.com/drop)
2. Drag your project folder
3. Done! Your site is live

### Method 2: Git Integration

1. **Connect Repository**
   - Sign in to [Netlify](https://app.netlify.com)
   - Click **Add new site** → **Import an existing project**
   - Connect your Git provider
   - Select your repository

2. **Configure Build Settings**
   ```
   Build command: (leave empty)
   Publish directory: .
   ```

3. **Deploy**
   - Click **Deploy site**
   - Your site is live!

### Features
- Automatic deployments on push
- Free SSL certificates
- Custom domains
- Form handling
- Serverless functions (if needed)

### CLI Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd ai-tech-radar
netlify deploy --prod
```

---

## ⚡ Vercel

**Difficulty:** ⭐ Easy  
**Cost:** Free (with limits)  
**Best for:** Modern deployments, edge functions

### Steps

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd ai-tech-radar
   vercel
   ```

3. **Follow Prompts**
   - Link to existing project or create new
   - Confirm settings
   - Deploy!

### Git Integration

1. Visit [Vercel](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your Git repository
4. Click **Deploy**

### Features
- Edge network (fast globally)
- Automatic HTTPS
- Preview deployments for PRs
- Analytics
- Custom domains

---

## 📦 AWS S3

**Difficulty:** ⭐⭐ Moderate  
**Cost:** ~$0.50/month (low traffic)  
**Best for:** AWS ecosystem, enterprise

### Steps

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://ai-tech-radar
   ```

2. **Configure for Static Website**
   ```bash
   aws s3 website s3://ai-tech-radar \
     --index-document index.html \
     --error-document index.html
   ```

3. **Upload Files**
   ```bash
   aws s3 sync . s3://ai-tech-radar \
     --exclude ".git/*" \
     --exclude "*.md" \
     --cache-control max-age=3600
   ```

4. **Set Bucket Policy**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Sid": "PublicReadGetObject",
       "Effect": "Allow",
       "Principal": "*",
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::ai-tech-radar/*"
     }]
   }
   ```

5. **Access Your Site**
   - URL: `http://ai-tech-radar.s3-website-us-east-1.amazonaws.com`

### With CloudFront (CDN)

1. Create CloudFront distribution
2. Point to S3 bucket
3. Configure SSL certificate
4. Add custom domain

---

## 💙 Azure Static Web Apps

**Difficulty:** ⭐⭐ Moderate  
**Cost:** Free tier available  
**Best for:** Azure ecosystem, enterprise

### Steps

1. **Install Azure CLI**
   ```bash
   brew install azure-cli  # macOS
   # or download from https://aka.ms/installazurecliwindows
   ```

2. **Login**
   ```bash
   az login
   ```

3. **Create Static Web App**
   ```bash
   az staticwebapp create \
     --name ai-tech-radar \
     --resource-group myResourceGroup \
     --source https://github.com/yourusername/ai-tech-radar \
     --location "eastus2" \
     --branch main \
     --app-location "/" \
     --output-location "/"
   ```

### Via Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Create new **Static Web App**
3. Connect to GitHub repository
4. Configure build settings:
   ```
   App location: /
   Output location: /
   ```
5. Review and create

---

## ☁️ Cloudflare Pages

**Difficulty:** ⭐ Easy  
**Cost:** Free  
**Best for:** Performance, DDoS protection

### Steps

1. **Sign in to Cloudflare**
   - Visit [Cloudflare Pages](https://pages.cloudflare.com)
   - Create account or sign in

2. **Create Project**
   - Click **Create a project**
   - Connect your Git provider
   - Select repository

3. **Configure Build**
   ```
   Build command: (leave empty)
   Build output directory: /
   ```

4. **Deploy**
   - Click **Save and Deploy**
   - Your site is live at `projectname.pages.dev`

### Features
- Unlimited bandwidth
- Unlimited requests
- Built-in analytics
- Custom domains
- Edge workers (serverless)

---

## 🌐 Custom Domain Setup

### DNS Configuration

For any hosting provider, configure DNS:

**Option 1: CNAME (Subdomain)**
```
Type: CNAME
Name: radar
Value: your-hosting-url
TTL: 3600
```

**Option 2: A Record (Root Domain)**
```
Type: A
Name: @
Value: hosting-ip-address
TTL: 3600
```

### SSL/HTTPS

Most modern hosting providers include free SSL:
- GitHub Pages: Automatic
- Netlify: Automatic (Let's Encrypt)
- Vercel: Automatic
- Cloudflare: Automatic
- AWS: Use AWS Certificate Manager
- Azure: Configure in portal

---

## 🔧 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Validate Markdown Files
        run: |
          pip install pyyaml
          python validate.py
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

---

## 📊 Performance Optimization

### Before Deployment

1. **Minify JavaScript** (optional)
   ```bash
   npx terser app.js -o app.min.js
   npx terser markdown-parser.js -o markdown-parser.min.js
   ```

2. **Minify CSS**
   ```bash
   npx csso styles.css -o styles.min.css
   ```

3. **Update HTML** to reference minified files

### CDN Configuration

For optimal performance, use CDN for external libraries:
- D3.js: `https://cdn.jsdelivr.net/npm/d3@7`
- marked.js: `https://cdn.jsdelivr.net/npm/marked@11.0.0`
- js-yaml: `https://cdn.jsdelivr.net/npm/js-yaml@4.1.0`

Already configured in `index.html`!

---

## 🔐 Security Considerations

### Headers

Add security headers via hosting provider:

```
Content-Security-Policy: default-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

### Netlify (_headers file)
```
/*
  Content-Security-Policy: default-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
```

### Vercel (vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        }
      ]
    }
  ]
}
```

---

## 📈 Analytics

### Google Analytics

Add to `<head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible Analytics (Privacy-Friendly)

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## 🧪 Testing Deployment

Before going live:

1. **Test Locally**
   ```bash
   python3 -m http.server 8000
   ```

2. **Validate Files**
   ```bash
   python validate.py
   ```

3. **Check in Multiple Browsers**
   - Chrome
   - Firefox
   - Safari
   - Edge

4. **Mobile Testing**
   - Use browser dev tools
   - Test on actual devices

5. **Performance Testing**
   - [PageSpeed Insights](https://pagespeed.web.dev/)
   - [GTmetrix](https://gtmetrix.com/)

---

## 🔄 Update Strategy

### Manual Updates
```bash
# Make changes
git add .
git commit -m "Update: Add new technology"
git push
```

### Automatic Deployment
Most platforms auto-deploy on push to main branch.

### Rollback
```bash
# Revert to previous commit
git revert HEAD
git push
```

---

## 💡 Tips

1. **Use branches** for testing major changes
2. **Pin CDN versions** to avoid breaking changes
3. **Set up monitoring** for uptime
4. **Regular backups** - export data regularly
5. **Document changes** in commit messages
6. **Test before merging** to main branch

---

## 📞 Support

- **Issues:** Check hosting provider's status page
- **DNS:** Use `dig` or `nslookup` to verify
- **SSL:** Check certificate expiration
- **Performance:** Use browser dev tools

---

## ✅ Deployment Checklist

- [ ] Code tested locally
- [ ] All files validated
- [ ] External resources loaded via CDN
- [ ] Security headers configured
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Analytics configured (if desired)
- [ ] 404 page handled
- [ ] Mobile-responsive confirmed
- [ ] Cross-browser tested
- [ ] Performance optimized
- [ ] Backup strategy in place

---

**Happy Deploying! 🚀**
