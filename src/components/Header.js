import { Navbar, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
export const Header = () => {
  return (
    <header>
      <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
	  <Container>
	  <LinkContainer to='/'>
            <Navbar.Brand>HUMANZ</Navbar.Brand>
          </LinkContainer>
	  </Container>
	  </Navbar>
    </header>
  )
}
