import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleParams, setArticleParams] =
		useState<ArticleStateType>(defaultArticleState);
	const applyTheme = (themeParams: ArticleStateType) => {
		return {
			'--font-family': themeParams.fontFamilyOption.value,
			'--font-size': themeParams.fontSizeOption.value,
			'--font-color': themeParams.fontColor.value,
			'--container-width': themeParams.contentWidth.value,
			'--bg-color': themeParams.backgroundColor.value,
		} as CSSProperties;
	};
	return (
		<main className={clsx(styles.main)} style={applyTheme(articleParams)}>
			<ArticleParamsForm themeSetter={setArticleParams} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
