import { createMedia } from '@artsy/fresnel'
import {useState } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Plan.Degree'
      style={{
        fontFamily: 'sketch-3d',
        fontSize: mobile ? '2.5em' : '5.2em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Visual college degree planner for students'
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '0.2em',
      }}
    />
    <Button as={Link} to="/app" secondary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container>
)

const DesktopContainer = ({children}) => {
  const [fixed, setFixed] = useState(null)

  const hideFixedMenu = () => setFixed(false)
  const showFixedMenu = () => setFixed(true)

  const { loginWithRedirect } = useAuth0();

  return (
    <Media greaterThan='mobile'>
      <Visibility
        once={false}
        onBottomPassed={showFixedMenu}
        onBottomPassedReverse={hideFixedMenu}
      >
        <Segment
          textAlign='center'
          style={{ 
            minHeight: 700, 
            padding: '1em 0em', 
            backgroundImage: 'url("https://res.cloudinary.com/kannabox/image/upload/v1612077604/plan.degree/bg-2.png")',
            backgroundSize: 'contain',
          }}
          vertical
        >
          <Menu
            fixed={fixed ? 'top' : null}
            secondary={!fixed}
            size='large'
          >
            <Container>
              <Menu.Item as='a' href="#home"><strong>Home</strong></Menu.Item>
              <Menu.Item as='a' href="#features"><strong>Features</strong></Menu.Item>
              <Menu.Item as='a' href="#about"><strong>About</strong></Menu.Item>
              {/* <Menu.Item as='a'><strong>Careers</strong></Menu.Item>
              <Menu.Item as='a'><strong>Contact Us</strong></Menu.Item> */}
              <Menu.Item position='right'>
                <Button onClick={() => loginWithRedirect()}>
                  Log in
                </Button>
                <Button onClick={() => loginWithRedirect()} secondary style={{ marginLeft: '0.5em' }}>
                  Sign Up
                </Button>
              </Menu.Item>
            </Container>
          </Menu>
          <HomepageHeading />
        </Segment>
      </Visibility>
      {children}
    </Media>
  )
}

const MobileContainer = ({children}) => {
  const [sidebarOpened, setSidebarOpened] = useState(null)

  const handleSidebarHide = () => setSidebarOpened(false)
  const handleToggle = () => setSidebarOpened(true)

  const { loginWithRedirect } = useAuth0();

  return (
    <Media as={Sidebar.Pushable} at='mobile'>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation='overlay'
          secondary
          onHide={handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
        
          <Menu.Item as='a' href="#home"><strong>Home</strong></Menu.Item>
          <Menu.Item as='a' href="#features"><strong>Features</strong></Menu.Item>
          <Menu.Item as='a' href="#about"><strong>About</strong></Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            textAlign='center'
            style={{ 
              minHeight: 700, 
              padding: '1em 0em', 
              backgroundImage: 'url("https://res.cloudinary.com/kannabox/image/upload/v1612077604/plan.degree/bg-2.png")',
              backgroundSize: 'contain',
            }}
            vertical >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button onClick={() => loginWithRedirect()}>
                    Log in
                  </Button>
                  <Button onClick={() => loginWithRedirect()} secondary style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Media>
  )
}

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

const Landing = () => (
  <ResponsiveContainer>
    <div id="home"></div>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Making sure students have a graduation plan
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Many students don't have a clear path made up in their mind during their early years in college. We aim to bring clarity towards every student's degree plan by helping them plan out their entire college career using our neat little tool.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Made for students, by students
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              We understand exactly the level of confusion students have when they embark on their college journey. Our tool helps guide every student in meeting their graduation requirements, leaving no room for error.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image rounded size='medium' src='https://res.cloudinary.com/kannabox/image/upload/v1612077250/plan.degree/logo-1.png' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='huge'>Learn More</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <div id="features">
      <Segment style={{ padding: '0em 0em' }} vertical>
        <Divider
            as='h2'
            content="Features"
            className='header'
            horizontal
            style={{ marginTop: '0.5em', marginBottom: '2em', textTransform: 'uppercase' }}
          />
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Drag'n Drop
              </Header>
              <p style={{ fontSize: '1.33em' }}>Easily drag your courses around semesters without much effort.</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Automatic Validation
              </Header>
              <p style={{ fontSize: '1.33em' }}>We alert you every time you choose to do a course before it's pre-requisite.</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Elective Recommender
              </Header>
              <p style={{ fontSize: '1.33em' }}>We recommend the best electives according to your plan.</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Export Your Degree
              </Header>
              <p style={{ fontSize: '1.33em' }}>You have the ability to share your degree with others in just a few clicks.</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Graduation Tracker
              </Header>
              <p style={{ fontSize: '1.33em' }}>Track the number of credits you are away from graduation!</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                100% Secure
              </Header>
              <p style={{ fontSize: '1.33em' }}>Every little piece of data is end-to-end encrypted to guarantee user privacy.</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>

    <div id="about">
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Divider
              as='h2'
              content="About"
              className='header'
              horizontal
              style={{ marginBottom: '2em', textTransform: 'uppercase' }}
            />
        <Container text>
          <p style={{ fontSize: '1.33em' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p style={{ fontSize: '1.33em' }}>
            Facilisis magna etiam tempor orci eu lobortis elementum. Cursus mattis molestie a iaculis at. Pellentesque eu tincidunt tortor aliquam nulla. Urna porttitor rhoncus dolor purus non enim praesent elementum. Fermentum et sollicitudin ac orci phasellus egestas. Est pellentesque elit ullamcorper dignissim cras. Egestas purus viverra accumsan in nisl nisi scelerisque. Neque convallis a cras semper auctor. Sed nisi lacus sed viverra tellus in hac habitasse platea. Ipsum consequat nisl vel pretium lectus. Habitant morbi tristique senectus et netus et malesuada fames ac. Turpis nunc eget lorem dolor. Quisque sagittis purus sit amet volutpat consequat. Quisque id diam vel quam elementum pulvinar etiam non. Nisl purus in mollis nunc sed id semper. Hac habitasse platea dictumst quisque sagittis purus. Rutrum quisque non tellus orci ac auctor augue.
          </p>
        </Container>
      </Segment>
    </div>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Links' />
              <List link inverted>
                <List.Item as='a' href='#home'>Home</List.Item>
                <List.Item as='a' href='#features'>Features</List.Item>
                <List.Item as='a' href='#about'>About</List.Item>
                {/* <List.Item as='a' href='#home'>Careers</List.Item>
                <List.Item as='a' href='#home'>Contact Us</List.Item> */}
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              {/* <Header inverted as='h4' content='Socials' />
              <List link inverted>
                <List.Item as='a'>E-Mail</List.Item>
                <List.Item as='a'>LinkedIn</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}> */}
              <Header as='h4' inverted content='Legal' />
              <List link inverted>
                <List.Item as='a' href='#'>Terms of Use</List.Item>
                <List.Item as='a' href='#'>Privacy Policy</List.Item>
              </List>
              
              <p>
                © Plan.Degree 2021, All rights reserved.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default Landing;