import {connect} from "react-redux";
import {Dispatch} from "redux";
import {IReduxProps} from "./BaseReduxComponent";

/**
 * Extended redux connect function with interfaces support
 * @param mapState
 * @param mapDispatch
 */
export function connectAdv<IStateProps, IDispatchProps>
(mapState: ((state: any, ownProps: any) => IStateProps) | null,
 mapDispatch?: (dispatch: Dispatch, ownProps: any) => IDispatchProps): any {
    return connect(mapState, mapDispatch as any, merge) as any;
}

/**
 * Merge properties
 * @param stateProps
 * @param dispatchProps
 * @param ownProps
 */
function merge<IStateProps, IDispatchProps>(
    stateProps: IStateProps,
    dispatchProps: IDispatchProps,
    ownProps: any): IReduxProps<IStateProps, IDispatchProps> {
    return Object.assign({}, ownProps, {
        stateProps,
        dispatchProps
    });
}
