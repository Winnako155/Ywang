const OWNER = 'Winnako155'; // 你的 GitHub 用户名
const REPO = 'Ywang'; // 你的仓库名

function getGithubIssue(id) {
    // 获取Github指定文章详情
    const API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/issues/${id}`;

    fetch(API_URL)
      .then(response => response.json())
      .then(issues => {
        // issues 就是你的文章详情
        // 文章详情在 issues.body 中
        // 文章标题在 issues.title 中
        // 文章创建时间在 issues.created_at 中
        console.log("文章详情:", issues);
        return {
            title: textInputAnimation(issues.title, 100, title),
            created_at: textInputAnimation(issues.created_at, 100, time),
            context: marked.parse(issues.body)
        };
        })
      .catch(err => showDialog('错误',`读取失败${err}`,false));
}


function getGithubIssues() {
    const API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/issues?labels=post&state=open`;
    
    return fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        return data.map(issue => ({
            title: issue.title,
            created_at: issue.created_at,
            context: marked.parse(issue.body)
        }));
      })
      .catch(err => showDialog('错误', `获取文章失败${err}`, false));
}