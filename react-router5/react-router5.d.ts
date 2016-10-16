// Type definitions for react-router5 v4.0.0
// https://github.com/router5/react-router5

import { Router5 } from 'router5';
import { Component, Props } from 'react';

interface RouteOptions {
	reload?: boolean;
}

interface LinkProps extends Props<Link> {
	router?: Router5;
	routeName: string;
	routeParams?: {};
	routeOptions?: RouteOptions;
	activeClassName?: string;
	activeStrict?: boolean;
	onClick?: Function;
}

interface RouterProviderProps {
	router: Router5;
}

declare class BaseLink extends Component<LinkProps, {}> { }
declare class Link extends Component<LinkProps, {}> { }
declare class RouterProvider extends Component<RouterProviderProps, {}> { }

declare function routeNode(nodeName: string, register?: boolean): Function;
declare function withRoute<C>(BaseComponent: C): C;

export {
	BaseLink,
	routeNode,
	RouterProvider,
	withRoute,
	Link
};
