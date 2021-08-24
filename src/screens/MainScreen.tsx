import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput,
    FlatList
} from 'react-native';
import {BaseReduxComponent} from "../core/BaseReduxComponent";
import {Pages} from "../navigation/Pages";
import {connectAdv} from "../core/connectAdv";
import {Dispatch} from "redux";
import {SearchAsync} from "../modules/search/SearchAsync";

interface State {
    searchHistory: string[];
}

interface DispatchProps {
    loadHistory: () => void;
    saveQuery: (query: string[]) => void;
}

/**
 * Main screen
 */
class Main extends BaseReduxComponent<State, DispatchProps> {
    state: {
        searchText: string;
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.dispatchProps.loadHistory();
    }

    /**
     * Save query to search history
     * @param searchText
     * @private
     */
    private _saveToHistory(searchText: string) {
        this.stateProps.searchHistory.push(searchText);
        this.dispatchProps.saveQuery(this.stateProps.searchHistory);
    }

    /**
     * Go button action
     * @private
     */
    _onPressSearch() {
        const searchText = this.state ? this.state.searchText : '';
        if (0 === searchText.length) {
            return;
        }

        this._saveToHistory(searchText);
        this.props.navigation.navigate(Pages.searchScreen, {
            searchText: searchText
        });
    }

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.topContainer}>
                    <Text style={styles.searchTitle}>Previous search</Text>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                        style={{flexGrow: 0}}
                        data={this.stateProps.searchHistory}
                        keyExtractor={(item, index) => index}
                        renderItem={(item) => (<Text style={styles.tag}>{item.item}</Text>)}
                    />

                    <TextInput style={styles.searchField}
                               testID='search_field'
                               placeholder='Type here..'
                               onChangeText={(searchText) => this.setState({searchText: searchText})}
                    />

                    <TouchableHighlight testID='do_search' style={styles.searchButton}
                                        onPress={this._onPressSearch.bind(this)}
                                        underlayColor='#007AFF'>
                        <Text style={styles.buttonText}>GO</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    };
}

export const MainScreen = connectAdv((state, ownProps): State => ({
    searchHistory: state.apiReducer.searchHistory ?? []
}), (dispatch: Dispatch): DispatchProps => ({
    saveQuery: (query: string[]): void => {
        dispatch(SearchAsync.saveQuery(query))
    },
    loadHistory: (): void => {
        dispatch(SearchAsync.loadQueryHistory())
    }
}))(Main);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
    },
    topContainer: {
        margin: 10,
        borderRadius: 10,
        flex: 2,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    searchTitle: {
        fontSize: 30,
        marginBottom: 10,
        fontFamily: 'helvetica',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        color: '#4A4A4A',
    },
    searchButton: {
        marginTop: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#00ccff',
        borderRadius: 10,
        height: 52, width: 100
    },
    buttonText: {
        fontSize: 24,
        fontFamily: 'helvetica',
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    searchField: {
        fontSize: 30,
        fontFamily: 'helvetica',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        color: '#007AFF',
        marginTop: 30,
        height: 64, width: 300
    },
    searchHistory: {
        textAlign: 'center',
        color: '#4A4A4A',
        fontSize: 21,
    },
    tag: {
        fontSize: 18,
        backgroundColor: '#c2c2c2',
        color: '#fff',
        borderRadius: 5,
        padding: 5,
        marginRight: 5
    }
})

export default MainScreen;
