Login = React.createClass({
  validations() {
    let component = this;

    return {
      rules: {
        emailAddress: {
          required: true,
          email: true
        },
        password: {
          required: true
        }
      },
      messages: {
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address legit?'
        },
        password: {
          required: 'Need a password here.'
        }
      },
      submitHandler() {
        let { getValue } = ReactHelpers;

        let form     = component.refs.loginForm.refs.form,
            email    = getValue( form, '[name="emailAddress"]' ),
            password = getValue( form, '[name="password"]' );

        Meteor.loginWithPassword( email, password, ( error ) => {
          if ( error ) {
            Bert.alert( error.reason, 'danger' );
          } else {
            Bert.alert( 'Logged in!', 'success' );
          }
        });
      }
    };
  },
  handleSubmit( event ) {
    event.preventDefault();
  },
  render() {
    let passwordLabelLink = {
      href: '/recover-password',
      label: 'Forget Password?'
    };

    return <Grid>
	  <Row>
        <Col xs={12} sm={6} md={5} lg={4}>
		  <PageHeader size="h4" label="Log In" />
	      <Alert bsStyle="danger">
	        To access the demo, you can use the email address <strong>admin@admin.com</strong> and the password <strong>password</strong>.
	      </Alert>
	      <form ref="loginForm" id="login" className="login" validations={ this.validations() } onSubmit={ this.handleSubmit }>
	        <Input ref="emailAddress" type="email" label="Email Address" placeholder="Enter Email"/>
	        <Input ref="password" type="password" label="Password" placeholder="Enter Password" />
			<ButtonInput bsStyle="success" type="submit">Login</ButtonInput>
	      </form>
	      <p>Don't have an account? <a href="/signup">Sign Up</a>.</p>
		</Col>
	  </Row>
    </Grid>;
  }
});
