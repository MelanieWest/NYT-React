import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    title: "",
    link: "",
    saved: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", saved: false })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
      API.saveArticle({
        title: this.state.title,
        link: this.state.link,
        saved: true
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }

    handleFindNew = event => {
      event.preventDefault();
        API.getNew({
          date: Date.now,
          saved: false
        })
          .then(res => this.loadBooks())
          .catch(err => console.log(err));
      }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Articles to Read</h1>
            </Jumbotron>

          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1>Found Articles</h1>
              <FormBtn
                onClick={this.handleFindNew}>
                Find New
              </FormBtn>

            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.title} by {article.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    <FormBtn
                      onClick={this.handleFormSubmit}
                    >
                      Save
                    </FormBtn>

                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  };
};


export default Articles;
