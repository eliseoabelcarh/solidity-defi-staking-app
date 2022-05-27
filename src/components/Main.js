import React, { Component } from "react";
import {
  Stack,
  Button,
  Container,
  Col,
  Row,
  Card,
  ListGroup,
  Form,
  Badge,
} from "react-bootstrap";

export default class Main extends Component {
  state = {
    val: "",
    formValid: false,
  };

  render() {
    const fromWei = (amount) => window.web3.utils.fromWei(amount, "Ether");
    const toWei = (amount) => window.web3.utils.toWei(amount, "Ether");
    const {
      tetherBalance,
      rwdBalance,
      stakingBalance,
      stakeTokens,
      unstakeTokens,
    } = this.props;
const withdraw = () => {
  unstakeTokens()
}
    const handleSubmit = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const form = event.currentTarget;
      console.log("valor: ", this.state.val);
      console.log("formValid", this.state.formValid);
      console.log("checkValidity", form.checkValidity()); //cheka colo si esta vacío o no

      if(form.checkValidity() === true && this.state.formValid === true){
        //stake tokens
        let amount = toWei(this.state.val)
        console.log("valorToWei: ", toWei(this.state.val));
        stakeTokens(amount)
      }else{
        //mostrar error
        
      }


    };

    return (
      <div
        className="p-5"
        style={{ backgroundColor: "#DADADA", minHeight: "100vh" }}
      >
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Card style={{ width: "18rem" }}>
                <ListGroup className="text-center" variant="flush">
                  <ListGroup.Item>Staking Balance</ListGroup.Item>
                  <ListGroup.Item>
                    {fromWei(stakingBalance)} USDT
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col md="auto">
              {" "}
              <Card style={{ width: "18rem" }}>
                <ListGroup className="text-center" variant="flush">
                  <ListGroup.Item>Reward Balance</ListGroup.Item>
                  <ListGroup.Item>{fromWei(rwdBalance)} RWD</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
        <Card className="m-4">
          <Card.Body>
            <Stack direction="horizontal" gap={2} className="m-2">
              <div>Stake Tokens</div>
              <div className=" ms-auto">Balance:{fromWei(tetherBalance)}</div>
            </Stack>

            <Form
              noValidate
              validated={this.state.formValid}
              onSubmit={handleSubmit}
            >
              <Stack direction="horizontal" gap={2}>
                <Form.Control
                  required
                  className="me-auto"
                  placeholder="0"
                  type="decimal"
                  onChange={(e) => {
                    this.setState({
                      val: e.target.value,
                      formValid:
                        Number(e.target.value) <= fromWei(tetherBalance) &&
                        Number(e.target.value) > 0,
                    });
                  }}
                />
                <div className="bg-light border p-1">USDT</div>
              </Stack>
              <Stack gap={2} className="col-md-5 mx-auto m-4 text-center">
                <Button variant="primary" type="submit">
                  Deposit
                </Button>
                <Button variant="secondary" onClick={withdraw}>Withdraw</Button>
                <p className="fw-bolder mt-3" style={{ fontSize: "0.8rem" }}>
                  AIRDROP <Badge bg="secondary">0:20</Badge>
                </p>
              </Stack>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
