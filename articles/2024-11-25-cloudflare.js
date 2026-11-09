// 一篇文章：imgSource(封面图) / title(标题) / date(日期) / content(正文，支持 HTML)
window.ARTICLES = window.ARTICLES || [];
window.ARTICLES.push({
    imgSource: 'https://www.bing.com/th?id=OHR.PipiwaiTrail_ZH-CN1811194311_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
    title: '迁移到 Cloudflare',
    date: '2024-11-25',
    content: `
        <p>站点从原来的服务器搬到了 Cloudflare Pages。</p>
        <p>好处是构建和部署都走 CI，推一次代码就自动上线；访问速度也比之前稳定。</p>
    `
});
