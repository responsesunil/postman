import React, { Component } from 'react'
import {
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { get, post, deleteApi, put } from '../../api/request'
import { METHODS } from '../../utils/constant'
import './styles.css'


class Home extends Component {
  state = {
    url: '',
    method: METHODS[0],
    response: undefined,
    error: {},
    requestData: '',
    history: []
  }

  onChangeMethod = ({ target: { value } }) => {
    this.setState({
      method: value
    })
  }

  onChangeURL = ({ target: { value, name } }) => {
    this.setState({
      url: value
    })
  }

  handleReqBody = ({target: { value }}) => {
    this.setState({
      requestData: value
    })
  }

  handleRequest = async () => {
    const { url, method, requestData } = this.state
    try {
      if (method === 'GET') {
        const data = await get(url)
        this.setState({
          response: data
  
        })
      } else if(method === 'POST') {
        const data = await post(url, JSON.parse(requestData))
        this.setState({
          response: data
        })
      } else if(method === 'PUT') {
        const data = await put(url, JSON.parse(requestData))
        this.setState({
          response: data
        })
      } else if(method === 'DELETE') {
        const data = await deleteApi(url)
        this.setState({
          response: data
        })
      }
    } catch(e) {
      this.setState({
        error: e.message
      })
    } finally {
      this.setState({
        loading: false
      })
    }
  }


  onSubmit = async (e) => {
    e.preventDefault()
    const { url, method, history } = this.state
    this.setState({
      loading: true,
      history: [
        ...history,
        {
          method,
          url
        }
      ]
    })
    this.handleRequest()
  }

  renderForm = () => {
    const { url, method, response, requestData, loading } = this.state

    return (
      <form onSubmit={this.onSubmit} >
        <Grid container justify="center" alignItems="center" spacing={4}>
          <Grid item md={2} lg={1}>
            <FormControl>
              <InputLabel id="request-method">Method</InputLabel>
              <Select
                labelId="request-method"
                id="request-method-select"
                value={method}
                onChange={this.onChangeMethod}
              >
                {METHODS.map(type => (
                  <MenuItem
                    value={type}
                    key={type}
                  >
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid md={8} lg={10} item>
            <TextField
              fullWidth
              name="url"
              label="URL"
              variant="outlined"
              value={url}
              onChange={this.onChangeURL}
            />
          </Grid>
          <Grid item md={2} lg={1}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              name="send"
            >
              Send
            </Button>
          </Grid>
        </Grid>
        {loading && <LinearProgress color="primary" className="mt-20" />}
        {(method === 'POST' || method === 'PUT') && <Grid container className="request-body">
          <Grid item xs>
            <Typography variant="h6">
                  Data
            </Typography>
            <textarea
              onChange={this.handleReqBody}
              className="params"
              value={requestData}
            />
          </Grid>
        </Grid>}
      </form>
    )
  }

  renderResponseData = () => {
    const { response } = this.state
    return (
      response &&
        <Grid container wrap>
          <Grid item xs>
            <Typography variant="h4" className="mt-50">
              Response
            </Typography>
            <pre className="response-body">
              {JSON.stringify(response, null, 2)}
            </pre>
          </Grid>
        </Grid>
    )
  }

  renderRequestHistory = () => {
    const { history } = this.state
    return (
      <Container className="request-history-component">
        <Typography variant="h6">
          Request History
        </Typography>
        <List>
          {history.map((item, index) => {
            return (
              <ListItem key={index}>
                <Grid container>
                  <Grid item md={4}>
                      <ListItemText primary={item.method} />
                  </Grid>
                  <Grid item md={8}>
                      <ListItemText primary={item.url} />
                  </Grid>
                </Grid>
              </ListItem>
            )
          })}
        </List>
      </Container>
    )
  }

  render() {
    return (
      <Container className="home-container">
        <Grid container spacing={3}>
          <Grid item sm={3} lg={4}>
            {this.renderRequestHistory()}
          </Grid>
          <Grid item sm={9} lg={8}>
            {this.renderForm()}
            {this.renderResponseData()}
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default Home;