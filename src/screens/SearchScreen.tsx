import * as React from "react";
import {BaseReduxComponent} from "../core/BaseReduxComponent";
import {AppState} from "../core/dto/AppState";
import {Dispatch} from "redux";
import {SearchRequest} from "../core/dto/Search";
import {SearchAsync} from "../modules/search/SearchAsync";
import {connectAdv} from "../core/connectAdv";
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import {ImagePreview} from "../common/components/ImagePreview";
import MasonryList from "@react-native-seoul/masonry-list";

interface DispatchProps {
    search: (request: SearchRequest) => void;
}

/**
 * Image result screen
 */
class ImageResults extends BaseReduxComponent<AppState, DispatchProps> {
    constructor(props) {
        super(props);
    }

    state = {
        isLoadingMore: false
    };

    componentDidMount() {
        this.getInitData();
    }

    /**
     * Load initial data
     */
    private getInitData = (): void => {
        this.dispatchProps.search({text: this.stateProps.query, page: 1});
    }

    /**
     * Load more data
     */
    private loadMore = (): void => {
        if (this.stateProps.loading) {
            return;
        }

        this.setState({isLoadingMore: true});
        this.dispatchProps.search({text: this.stateProps.query, page: this.stateProps.data.page + 1});
    }

    render() {
        const data = this.stateProps.data ? this.stateProps.data.photo : [];
        return (
            <View style={styles.root}>
                {
                    this.stateProps.loading && !this.state.isLoadingMore ?
                        <ActivityIndicator size="large" color='#007AFF'/> :
                        <MasonryList
                            testID='item_list'
                            ListEmptyComponent={<Text>Nothing was found</Text>}
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
                            data={data}
                            keyExtractor={(item, index): string => item.id.toString()}
                            renderItem={({item}) => (
                                <ImagePreview key={item.id} image={item}/>
                            )}
                            onRefresh={this.getInitData.bind(this)}
                            onEndReachedThreshold={0.1}
                            onEndReached={this.loadMore.bind(this)}
                            loading={this.stateProps.loading}
                        />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center'
    },
});

export const SearchScreen = connectAdv((state, ownProps): AppState => ({
    error: state.apiReducer.error,
    loading: state.apiReducer.loading,
    query: ownProps.route.params.searchText,
    data: state.apiReducer.data,
    searchHistory: state.apiReducer.searchHistory
}), (dispatch: Dispatch): DispatchProps => ({
    search: (request: SearchRequest): void => {
        dispatch(SearchAsync.search(request))
    }
}))(ImageResults);
