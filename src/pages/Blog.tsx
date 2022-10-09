import React from 'react';
import axios from 'axios';

import BlogForm from '../components/BlogForm';
import ArticlesSection from '../components/ArticlesSection';
import ArticlesTable from '../components/ArticlesTable';
import IArticle, { MockArticleList } from '../constants/IArticle';

const {useEffect, useState} = React;
export interface IBlogPageProps {};

const BlogPage: React.FunctionComponent<IBlogPageProps> = props => {
	useEffect(() => {
	  window.scrollTo(0, 0)
	}, [])
		
	const [_latestArticles, set_latestArticles] = useState<IArticle[]>([]);
	const [_articles, set_articles] = useState<IArticle[]>([]);
	const [currentlySelected, set_currentlySelected] = useState<IArticle>();

	const setCancelSelected = (_article: IArticle) => {
		set_currentlySelected(_article)
	}
	const setNewArticleToEdit = (_article: IArticle) => {
		console.log(_article);
		window.scrollTo(0, 0)
		set_currentlySelected(_article)
	}
	const getArticlesResults = async () => {
		try {
			const axiosRequestData = {url:"https://servicepad-post-api.herokuapp.com/articles/", method: 'get',};
			const _getArticlesResults = await axios(axiosRequestData)
			const lastArticles = _getArticlesResults.data.data.splice(0,6).reverse()
			set_articles(lastArticles)

			const last4Articles = _getArticlesResults.data.data.splice(0,4).reverse()
			console.log("last4Articles",last4Articles)
			set_latestArticles(last4Articles)
		} catch (error) {
			console.log("MockArticleList",MockArticleList)
			set_latestArticles(MockArticleList);
		}
	};

	useEffect(() => {
		return () => {
			getArticlesResults()
		};
	}, [])

	return (
		<div className="eb-blog-wrapper" >
			<div className="eb-blog">

				<BlogForm currentlySelected={currentlySelected} onCancelEdit={setCancelSelected} />

				<h1 className="eb-blog-previous-title">Previous Articles</h1>
				<div className="eb-blog-subtitle mb-8 pb-4">
					Review and edit previous blog posts published on to the homepage. 
				</div>

				<ArticlesTable articles={_articles} onEdit={setNewArticleToEdit} />

				<div className="eb-articles-table-paginate flex-between ">
					<div className="pa-5 eb-articles-table-prev tx-bold-400 flex">
						<div className="pr-2">←</div> Previous 
					</div>
					<div className="pa-5 eb-articles-table-pages flex tx-bold-400">
						<div className="px-4 py-5 clickable opacity-hover--50">
							1
						</div>
						<div className="pa-5 px-0">
							...
						</div>
						<div className="flex">
							<div className="pa-5 px-4 clickable opacity-hover--50">
								2
							</div>
							<div className="pa-5 px-4 clickable opacity-hover--50">
								3
							</div>
							<div className="pa-5 px-4 clickable opacity-hover--50">
								4
							</div>
						</div>
						<div className="pa-5 px-0">
							...
						</div>
						<div className="pa-5 clickable opacity-hover--50">
							10
						</div>
					</div>
					<div className="pa-5 eb-articles-table-next tx-bold-400 flex">
						Next <div className="pl-2">→</div>
					</div>
				</div>
			</div>
			<ArticlesSection articles={_latestArticles} />
		</div>
	);
};

export default BlogPage;