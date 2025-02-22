import "./home.css";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { addTransaction, getTransactions } from "../../utils/ApiRequest";
import Spinner from "../../components/Spinner";
import TableData from "./TableData";
import Analytics from "./Analytics";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormatListBulleted, BarChart, Add, Refresh } from "@mui/icons-material"; // Removed FilterList

// Move toastOptions outside the component
const toastOptions = {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const Home = () => {
  const navigate = useNavigate();

  const [cUser, setcUser] = useState(null); // Initialize cUser as null
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [view, setView] = useState("table");

  const handleStartChange = (date) => {
    setStartDate(date);
  };

  const handleEndChange = (date) => {
    setEndDate(date);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const avatarFunc = async () => {
      if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);

        if (user.isAvatarImageSet === false || user.avatarImage === "") {
          navigate("/setAvatar");
        }
        setcUser(user); // Set cUser state
        setRefresh(true);
      } else {
        navigate("/login");
      }
    };

    avatarFunc();
  }, [navigate]);

  const [values, setValues] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeFrequency = (e) => {
    setFrequency(e.target.value);
  };

  const handleSetType = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, amount, description, category, date, transactionType } =
      values;

    if (
      !title ||
      !amount ||
      !description ||
      !category ||
      !date ||
      !transactionType
    ) {
      toast.error("Please enter all the fields", toastOptions);
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(addTransaction, {
        title: title,
        amount: amount,
        description: description,
        category: category,
        date: date,
        transactionType: transactionType,
        userId: cUser._id, // Ensure cUser is defined before accessing cUser._id
      });

      if (data.success === true) {
        toast.success(data.message, toastOptions);
        handleClose();
        setRefresh(!refresh);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.", toastOptions);
    }

    setLoading(false);
  };

  const handleReset = () => {
    setType("all");
    setStartDate(null);
    setEndDate(null);
    setFrequency("7");
  };

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        setLoading(true);
        console.log(cUser?._id, frequency, startDate, endDate, type); // Use optional chaining
        const { data } = await axios.post(getTransactions, {
          userId: cUser?._id, // Use optional chaining
          frequency: frequency,
          startDate: startDate,
          endDate: endDate,
          type: type,
        });
        console.log(data);

        setTransactions(data.transactions);

        setLoading(false);
      } catch (err) {
        toast.error("Error please Try again...", toastOptions);
        setLoading(false);
      }
    };

    if (cUser && cUser._id) {
      fetchAllTransactions();
    }
  }, [refresh, frequency, endDate, type, startDate, cUser]); // Add cUser to dependencies

  const handleTableClick = (e) => {
    setView("table");
  };

  const handleChartClick = (e) => {
    setView("chart");
  };

  return (
    <>
      <Header />
      <Container fluid className="home-container">
        <Row>
          {/* Sidebar */}
          <Col md={2} className="sidebar">
            <div className="sidebar-sticky">
              <Button variant="primary" className="w-100 mb-3" onClick={handleShow}>
                <Add /> Add Transaction
              </Button>
              <Button variant="outline-secondary" className="w-100 mb-3" onClick={handleReset}>
                <Refresh /> Reset Filters
              </Button>
              <Button variant="outline-secondary" className="w-100 mb-3" onClick={handleTableClick}>
                <FormatListBulleted /> Table View
              </Button>
              <Button variant="outline-secondary" className="w-100 mb-3" onClick={handleChartClick}>
                <BarChart /> Analytics
              </Button>
            </div>
          </Col>

          {/* Main Content */}
          <Col md={10} className="main-content">
            <Card className="filter-card mb-4">
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="formSelectFrequency">
                      <Form.Label>Select Frequency</Form.Label>
                      <Form.Select
                        name="frequency"
                        value={frequency}
                        onChange={handleChangeFrequency}
                      >
                        <option value="7">Last Week</option>
                        <option value="30">Last Month</option>
                        <option value="365">Last Year</option>
                        <option value="custom">Custom</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formSelectType">
                      <Form.Label>Type</Form.Label>
                      <Form.Select name="type" value={type} onChange={handleSetType}>
                        <option value="all">All</option>
                        <option value="expense">Expense</option>
                        <option value="credit">Income</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  {frequency === "custom" && (
                    <Col md={4}>
                      <Form.Group controlId="formDateRange">
                        <Form.Label>Date Range</Form.Label>
                        <div className="d-flex gap-2">
                          <DatePicker
                            selected={startDate}
                            onChange={handleStartChange}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Start Date"
                            className="form-control"
                          />
                          <DatePicker
                            selected={endDate}
                            onChange={handleEndChange}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            placeholderText="End Date"
                            className="form-control"
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>

            {loading ? (
              <Spinner />
            ) : (
              <>
                {view === "table" ? (
                  <TableData data={transactions} user={cUser} />
                ) : (
                  <Analytics transactions={transactions} user={cUser} />
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>

      {/* Add Transaction Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="Enter Title"
                value={values.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                name="amount"
                type="number"
                placeholder="Enter Amount"
                value={values.amount}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={values.category}
                onChange={handleChange}
              >
                <option value="">Choose...</option>
                <option value="Groceries">Groceries</option>
                <option value="Rent">Rent</option>
                <option value="Salary">Salary</option>
                <option value="Tip">Tip</option>
                <option value="Food">Food</option>
                <option value="Medical">Medical</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Transportation">Transportation</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Enter Description"
                value={values.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTransactionType">
              <Form.Label>Transaction Type</Form.Label>
              <Form.Select
                name="transactionType"
                value={values.transactionType}
                onChange={handleChange}
              >
                <option value="">Choose...</option>
                <option value="credit">Credit</option>
                <option value="expense">Expense</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                name="date"
                type="date"
                value={values.date}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default Home;