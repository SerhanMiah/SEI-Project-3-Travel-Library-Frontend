import { useEffect, useState } from "react"
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../config.js'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Spinner from './Spinner.js'
import  Card  from "react-bootstrap/Card"


const Destination = () => {
  // const navigate = useNavigate()

  const { travelId } = useParams()
  const [ destination, setDestination ] = useState(null) 
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/travel/${travelId}`)
        setDestination(data)
      } catch (err) {
        setErrors(true)
      }
    }
    getData()
    console.log(destination)
  }, [travelId])

  
  // ! add reviews to the page 
  const addReview = async () => {
    try {
      await axios.post(`${API_URL}/travel/${travelId}`, {
        headers: {
          Authorization: `Bearer `
        },
      } )
    } catch (error) {
      console.log(error)
      setErrors(error)
    }
  }

  return (
    <Container as="main">
    <Row>
      { destination ? 
        <>
        <h1>{destination.name}</h1>
          <Col md="6">
            <img className='w-100' src={destination.imgUrl[0]} alt={destination.name} />
          </Col>
          <Col md="6">
            <h2> Description</h2>
            <h2><span>🌍</span>Country</h2>
            <p>{destination.country}</p>
            <p>Rating: {destination.rating}</p>
            <p>{destination.description}</p>
            <hr />
            <h2>Reviews</h2>    
            <Container className='text-center'>
              <Row>
                { destination.reviews.length > 0
                  ?
                  destination.reviews.map(review => {
                    const { _id: reviewId, reviewText, rating } = review
                    console.log('review', review)
                    const activities = review.activities.join(', ')
                    return (
                      <Col key={reviewId} md="6" lg="4" className='mb-4'>
                        <Link to={`/travel/${review.destinationId}`}>
                          <Card>
                            <Card.Img variant='top' src={review.reviewImgUrl[0] ? review.reviewImgUrl[0] : 'https://sei65-destinations.s3.eu-west-1.amazonaws.com/users/default-image.jpg' }></Card.Img>
                            <Card.Body>
                              <Card.Title className='text-center mb-0'>{review.destinationName}</Card.Title>
                              {/* Change this user id to the actual user's name */}
                              <p><span>👤</span>{destination.createdBy}</p>
                              <p>Rating: {rating}</p>
                              <p>Activities: {activities}</p>
                              <p>{reviewText}</p>
                              {/* Edit / Delete buttons - I will work on these next
                                <div className="buttons mb-4">
                                  <Button variant="danger" onClick={deleteReview}>Delete Review</Button>
                                  <Link to={`/bread/${bread._id}/edit`} className='btn btn-primary'>Edit Review</Link>
                                </div> */}
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    )
                  })
                  :
                  <>
                    { errors ? <h2>Something went wrong. Please try again later</h2> : <p>Add your first review</p>}
                  </>
                }
              </Row>
            </Container>












            {/* Edit / Delete buttons */}
            {/* { userIsOwner(destination) &&
              <div className="buttons mb-4">
                <Button variant="danger" onClick={deleteBread}>Delete bread</Button>
                <Link to={`/bread/${bread._id}/edit`} className='btn btn-primary'>Edit bread</Link>
              </div>
            } */}
            {/* Link back to all breads */}
            <Link to="/travel" className='btn dark'>Back to all Destination</Link>
          </Col>
        </>
        :
        <h2 className="text-center">
          { errors ? 'Something went wrong. Please try again later' : <Spinner />}
        </h2>
      }
    </Row>
  </Container>

  )


}


export default Destination