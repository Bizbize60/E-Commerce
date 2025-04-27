import React from 'react';

const  Page = (props: { children?: React.ReactNode; fluid?: boolean }) => {
	const container = props.fluid ? 'container-fluid' : 'container';
	return (
		<div className={container}>
			<div className='row'>{props.children}</div>
		</div>
	);
};

const Header = (props: { children?: React.ReactNode }) => <div className='col-12'>{props.children}</div>

Page.Header = Header;

const BreadCrumb = (props: { children?: React.ReactNode }) => <div className='col-12'>{props.children}</div>;
Page.BreadCrumb = BreadCrumb;

const Aside = (props: { children?: React.ReactNode }) => <div className='col-4'>{props.children}</div>;
Page.Aside = Aside;

const Main = (props: { children?: React.ReactNode; fullPage?: boolean }) => {
	const grid = props.fullPage ? '12' : '8';
	return <div className={'col-' + grid}>{props.children}</div>;
};
Page.Main = Main;

const Footer = (props: { children?: React.ReactNode }) => <div className='col-12'>{props.children}</div>;
Page.Footer = Footer;

export default Page;
