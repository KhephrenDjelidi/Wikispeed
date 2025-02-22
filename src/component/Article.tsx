export const ArticleDisplayer = (props:{title:string, content:string}) =>{
    return <div className='article-container'>
        <h2 className='manjari'>{props.title}</h2>
        <p className='manjari'>{props.content}</p>
      </div>
}