/**
 * WordPress dependencies
 */
import { createContext } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';

const { Consumer, Provider } = createContext( {
	name: null,
	icon: null,
} );

export { Provider as PluginContextProvider };

/**
 * A Higher Order Component used to inject Plugin context to the
 * wrapped component.
 *
 * @param {Function} mapContextToProps Function called on every context change,
 *                                     expected to return object of props to
 *                                     merge with the component's own props.
 *
 * @return {WPComponent} Enhanced component with injected context as props.
 */
export const withPluginContext = ( mapContextToProps ) =>
	createHigherOrderComponent( ( OriginalComponent ) => {
		return ( props ) => {
			const editorContext = useSelect( ( select ) => {
				return {
					editorContext: {
						currentPostType: select(
							'core/editor'
						).getCurrentPostType(),
					},
				};
			} );
			return (
				<Consumer>
					{ ( context ) => (
						<OriginalComponent
							{ ...props }
							{ ...editorContext }
							{ ...mapContextToProps( context, props ) }
						/>
					) }
				</Consumer>
			);
		};
	}, 'withPluginContext' );
