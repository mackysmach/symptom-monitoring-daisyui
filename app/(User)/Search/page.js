import './page.css';
import { Col, Row, Container } from 'react-bootstrap';
import { MyProvider } from '@/app/_Handlers/Mycontext';
import Searchbar from '@/app/_componenets/Searchbar';
import SearchCard from '@/app/_componenets/Searchcard';
function Search() {
    return (
        <MyProvider>
        <div className="container mx-auto px-4 sm-12">
                <Row className='mb-4'>
                    <Col md={6} xs={7} sm={6} lg={8} className='flex-search-container'>
                        <Searchbar />
                    </Col>
                    <Col md={2} xs={1} sm={2} lg={1}></Col>
                    <Col md={4} xs={4} sm={4} lg={2} className='flex-button-container'>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} sm={12} className='w-100'>
                        <div style={{ overflowX: 'auto' }}>
                            <SearchCard/>
                        </div>
                    </Col>
                </Row >
</div>           


        </MyProvider>
    )
}
export default Search;
