import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import * as React from 'react'
import { useCallback, useState } from 'react'
import { signUp } from '../../services/auth.service'

export default ({ history }) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')

  const updateName = useCallback(({ target }) => {
    setError('')
    setName(target.value)
  }, [true])

  const updateUsername = useCallback(({ target }) => {
    setError('')
    setUsername(target.value)
  }, [true])

  const updatePassword = useCallback(({ target }) => {
    setError('')
    setPassword(target.value)
  }, [true])

  const updatePasswordConfirm = useCallback(({ target }) => {
    setError('')
    setPasswordConfirm(target.value)
  }, [true])

  const maySignUp = useCallback(() => {
    return !!(name && username && password && password === passwordConfirm)
  }, [name, username, password, passwordConfirm])

  const handleSignUp = useCallback(() => {
    signUp({ username, password, passwordConfirm, name })
      .then(() => {
        history.replace('/sign-in')
      })
      .catch(error => {
        setError(error.message || error)
      })
  }, [name, username, password, passwordConfirm])

  return (
    <div className="SignUpForm">
      <form>
        <legend>Sign up</legend>
        <div
          style={{
            float: 'left',
            width: 'calc(50% - 10px)',
            paddingRight: '10px',
          }}
        >
          <TextField
            className="AuthScreen-text-field"
            label="Name"
            value={name}
            onChange={updateName}
            autoComplete="off"
            margin="normal"
          />
          <TextField
            className="AuthScreen-text-field"
            label="Username"
            value={username}
            onChange={updateUsername}
            autoComplete="off"
            margin="normal"
          />
        </div>
        <div
          style={{
            float: 'right',
            width: 'calc(50% - 10px)',
            paddingLeft: '10px',
          }}
        >
          <TextField
            className="AuthScreen-text-field"
            label="Password"
            type="password"
            value={password}
            onChange={updatePassword}
            autoComplete="off"
            margin="normal"
          />
          <TextField
            className="AuthScreen-text-field"
            label="Confirm password"
            type="password"
            value={passwordConfirm}
            onChange={updatePasswordConfirm}
            autoComplete="off"
            margin="normal"
          />
        </div>
        <Button
          type="button"
          color="secondary"
          variant="contained"
          disabled={!maySignUp()}
          onClick={handleSignUp}
        >
          Sign up
        </Button>
        <div className="AuthScreen-error">{error}</div>
      </form>
    </div>
  )
}