import * as React from "react";
import {
    Image,
} from 'react-native';
import {BaseReduxComponent} from "../../core/BaseReduxComponent";
import {ImageItem} from "../../core/dto/ImageItem";

interface Props {
    image: ImageItem;
}

/**
 * Flickr API image rendering from uri component
 */
export class ImagePreview extends BaseReduxComponent<any, any, any, Props> {
    render() {
        const item: ImageItem = this.props.image;
        const imageUri = `https://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`;

        return (
            <Image
                source={{uri: imageUri}}
                style={{
                    aspectRatio: 2 / 3
                }}
            />
        );
    }
}
