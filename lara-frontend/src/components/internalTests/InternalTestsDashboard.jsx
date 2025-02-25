import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import InternalTestLinkForm from './InternalTestLinkForm';
import AllInternalTests from './AllInternalTests';
// import StudentWiseTestOverview from './StudentWiseTestOverview';
import AllStudentsPerformance from './AllStudentsPerformance';
import CreateWeeklyTest from '../weeklyTest/CreateWeeklyTest';
import WeeklyTestList from '../weeklyTest/WeeklyTestList';
import EvaluvateWeeklyTest from '../weeklyTest/EvaluvateWeeklyTest';
import AllStudentsWeeklyTestPerformance from '../weeklyTest/weeklyTestStudentAnswerSubmission/AllStudentsWeeklyTestPerformance';

const InternalTestsDashboard = () => {
    const [activeComponent, setActiveComponent] = useState('AllTests');
    const [show, setShow] = useState(false); // State to control offcanvas visibility

    const renderComponent = () => {
        switch (activeComponent) {
            case 'createInternalTest':
                return <InternalTestLinkForm />;
            case 'AllTests':
                return <AllInternalTests />;
            // case 'StudentWiseTestOverview':
            //     return <StudentWiseTestOverview />;
            case 'AllStudentsPerformance':
                return <AllStudentsPerformance />;
            case 'CreateWeeklyTest':
                return <CreateWeeklyTest />;
            case 'WeeklyTestList':
                return <WeeklyTestList />;
            case 'EvaluvateWeeklyTest':
                return <EvaluvateWeeklyTest />;
            case 'AllStudentsWeeklyTestPerformance':
                return <AllStudentsWeeklyTestPerformance />;
            default:
                return <AllInternalTests />;
        }
    };

    return (
        <Container fluid className="shadow  my-3 responsive overflow-auto" style={{ overflow: 'auto' }}>
            <Row>
                <Col xs={12} md={2} id="sidebar-wrapper" className="bg-light">
                    <Navbar expand="md" className="bg-light d-md-none">
                        <Navbar.Brand href="#">Internal Tests</Navbar.Brand>
                        <Navbar.Toggle
                            aria-controls="offcanvasNavbar"
                            onClick={() => setShow(true)}
                        />
                    </Navbar>
                    <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Navigation</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav
                                activeKey={activeComponent}
                                onSelect={(selectedKey) => {
                                    setActiveComponent(selectedKey);
                                    setShow(false);
                                }}
                            >

                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="AllTests"
                                        className={activeComponent === 'AllTests' ? 'active' : ''}
                                    >
                                        All Test Links
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="createInternalTest"
                                        className={activeComponent === 'createInternalTest' ? 'active' : ''}
                                    >
                                        Create Internal Test
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="AllStudentsPerformance"
                                        className={activeComponent === 'AllStudentsPerformance' ? 'active' : ''}
                                    >
                                        Students Performance
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="CreateWeeklyTest"
                                        className={activeComponent === 'CreateWeeklyTest' ? 'active' : ''}
                                    >
                                        Create Weekly test Link
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="WeeklyTestList"
                                        className={activeComponent === 'WeeklyTestList' ? 'active' : ''}
                                    >
                                        Weekly Test List
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="EvaluvateWeeklyTest"
                                        className={activeComponent === 'EvaluvateWeeklyTest' ? 'active' : ''}
                                    >
                                        Evaluvate Weekly Test
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="AllStudentsWeeklyTestPerformance"
                                        className={activeComponent === 'AllStudentsWeeklyTestPerformance' ? 'active' : ''}
                                    >
                                        Student Performance Weekly Test
                                    </Nav.Link>
                                </Nav.Item>

                            </Nav>
                        </Offcanvas.Body>
                    </Offcanvas>

                    {/* Navigation links for large screens */}
                    <Nav
                        className="d-none d-md-block bg-light"
                        activeKey={activeComponent}
                        onSelect={(selectedKey) => setActiveComponent(selectedKey)}
                        style={{ minHeight: '100vh', paddingTop: '20px' }}
                    >
                        <Nav.Item>
                            <Nav.Link
                                eventKey="AllTests"
                                className={activeComponent === 'AllTests' ? 'active' : ''}
                            >
                                All Test Links
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="createInternalTest"
                                className={activeComponent === 'createInternalTest' ? 'active' : ''}
                            >
                                Create Internal Test
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="AllStudentsPerformance"
                                className={activeComponent === 'AllStudentsPerformance' ? 'active' : ''}
                            >
                                Students Performance
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="CreateWeeklyTest"
                                className={activeComponent === 'CreateWeeklyTest' ? 'active' : ''}
                            >
                                Create Weekly test Link
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="WeeklyTestList"
                                className={activeComponent === 'WeeklyTestList' ? 'active' : ''}
                            >
                                Weekly Test List
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="EvaluvateWeeklyTest"
                                className={activeComponent === 'EvaluvateWeeklyTest' ? 'active' : ''}
                            >
                                Evaluvate Weekly Test
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="AllStudentsWeeklyTestPerformance"
                                className={activeComponent === 'AllStudentsWeeklyTestPerformance' ? 'active' : ''}
                            >
                                Student Performance Weekly Test
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col xs={12} md={10} id="page-content-wrapper" style={{ maxWidth: '100%' }}>
                    <div className="container-fluid">
                        {renderComponent()}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default InternalTestsDashboard;
