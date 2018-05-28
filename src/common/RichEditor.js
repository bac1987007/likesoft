/**
 * Created by zhaoxin on 2016/12/12.
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

// RichEditor
class RichEditor extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isFirst: true,
    };
  }

  componentDidMount() {
    const { dispatch, richEditorData = {}, richSource } = this.props;
    const { width, height, upImgUrl, source } = richEditorData;
    const toolArr = [
      'Cut', 'Copy', 'Paste', 'Pastetext', 'Blocktag', 'Fontface',
      'FontSize', 'Bold', 'Italic', 'Underline', 'Strikethrough',
      'FontColor', 'BackColor', 'SelectAll', 'Removeformat', 'Align',
      'List', 'Outdent', 'Indent', 'Link', 'Unlink', 'Anchor', 'Img',
      'Hr', 'Table', 'Source', 'Preview', 'Print',
    ];
    this.editor = $(ReactDOM.findDOMNode(this.refs['rich-editor'])).xheditor({
      width: width || '100%',
      height: height || 400,
      tools: toolArr.join(','),
      skin: 'default',
      upMultiple: true,
      upImgUrl: upImgUrl || '',
      upImgExt: 'jpg,jpeg,gif,bmp,png,JPG,JPEG,GIF,BMP,PNG',
      onUpload(msg) {
        // console.log(msg);
      },
      html5Upload: false,
    });
    this.editor.setSource(richSource);

    // reset rich-editor to true when initial this component
    richEditorData.isFirst = true;
    this.setRichEditor(dispatch, richEditorData);
  }

  componentWillReceiveProps(props) {
        // let source = this.editor.getSource();
        // if (props.item && props.item.source && props.item.source === source) {
        //   this.editor.setSource(props.item.source);
        // }

        // props.item.isModal &&
    const { mode, richEditorData, dispatch, richSource } = props;
    if (mode === 'add' && richEditorData.isFirst) {
      this.resetSource();
      richEditorData.isFirst = false;
      this.setRichEditor(dispatch, richEditorData);
    } else if (mode !== 'add' && richEditorData.isFirst) { // reset source when rich-editor edited or updated
      this.setSource(richSource);
      richEditorData.isFirst = false;
      this.setRichEditor(dispatch, richEditorData);
    }
  }

  setRichEditor(dispatch, richEditorData) {
    dispatch({
      type: 'NoTaskAgent/setRichEditor',
      payload: { richEditorData },
    });
  }

  getSource() {
    return this.editor.getSource();
  }

  setSource(val) {
    this.editor.setSource(val);
  }

  resetSource() {
    this.editor.setSource('');
  }

  render() {
    return (
      <textarea ref="rich-editor" />
    );
  }

}

RichEditor.propTypes = {
  richEditorData: PropTypes.object,
};

export default RichEditor;
