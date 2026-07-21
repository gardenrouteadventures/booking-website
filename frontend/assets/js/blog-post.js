/* assets/js/blog-post.js */
document.addEventListener('DOMContentLoaded', function() {
    // ===== TABLE OF CONTENTS =====
    const headings = document.querySelectorAll('.blog-post-content h2');
    if (headings.length > 2) {
        const toc = document.createElement('div');
        toc.className = 'table-of-contents';
        toc.innerHTML = '<h4>Table of Contents</h4><ul></ul>';
        
        const tocList = toc.querySelector('ul');
        headings.forEach((heading, index) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = heading.textContent;
            a.href = `#heading-${index}`;
            a.addEventListener('click', function(e) {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            li.appendChild(a);
            tocList.appendChild(li);
            
            // Add ID to heading
            heading.id = `heading-${index}`;
        });
        
        const content = document.querySelector('.blog-post-content');
        if (content && content.firstChild) {
            content.insertBefore(toc, content.firstChild);
        }
    }

    // ===== READING PROGRESS =====
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--primary);
        z-index: 9999;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    // ===== SHARE BUTTONS =====
    document.querySelectorAll('.post-share a').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            if (this.querySelector('.fa-facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            } else if (this.querySelector('.fa-twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            } else if (this.querySelector('.fa-instagram')) {
                alert('Share this post on Instagram by copying the link.');
                return;
            } else if (this.querySelector('.fa-whatsapp')) {
                shareUrl = `https://wa.me/?text=${title}%20${url}`;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    // ===== ESTIMATED READING TIME =====
    const content = document.querySelector('.blog-post-content');
    if (content) {
        const text = content.textContent;
        const words = text.split(/\s+/).length;
        const readingTime = Math.ceil(words / 200);
        
        const timeElement = document.querySelector('.post-meta .fa-clock')?.parentElement;
        if (timeElement) {
            timeElement.textContent = ` ${readingTime} min read`;
        }
    }
});