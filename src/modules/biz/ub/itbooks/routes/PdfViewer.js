import React, {PureComponent} from 'react';
import {connect} from 'dva';
import PDF from 'react-pdf-js';

class PdfViewer extends PureComponent {

  state = {book: undefined};

  componentDidMount() {
    const {book} = this.props.match.params;
    this.setState({
      book: "http://static.freebooks.youbohudong.com/" + decodeURIComponent(book)
    })
  }

  onDocumentComplete = (pages) => {
    this.setState({page: 1, pages});
  }

  onPageComplete = (page) => {
    this.setState({page});
  }

  handlePrevious = () => {
    this.setState({page: this.state.page - 1});
  }

  handleNext = () => {
    this.setState({page: this.state.page + 1});
  }

  renderPagination = (page, pages) => {
    let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i
      className="fa fa-arrow-left"/> Previous</a></li>;
    if (page === 1) {
      previousButton =
        <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"/> Previous</a></li>;
    }
    let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i
      className="fa fa-arrow-right"/></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"/></a></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  }

  render() {
    console.log(this.state.book)
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    if (undefined !== this.state.book) {
      return <div>
        <PDF
          file={this.state.book}
          onDocumentComplete={this.onDocumentComplete}
          onPageComplete={this.onPageComplete}
          page={this.state.page}
        />
        {pagination}
      </div>
    } else {
      return <div></div>
    }
  }
}

export default connect(state => ({}))(PdfViewer);
