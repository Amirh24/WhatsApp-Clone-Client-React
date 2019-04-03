import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { History } from 'history'
import * as React from 'react'
import { useCallback, useState } from 'react'
import { signIn } from '../../services/auth.service'

interface SignInFormProps {
  history: History
}

export default ({ history }: SignInFormProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onUsernameChange = useCallback(({ target }) => {
    setError('')
    setUsername(target.value)
  }, [true])

  const onPasswordChange = useCallback(({ target }) => {
    setError('')
    setPassword(target.value)
  }, [true])

  const maySignIn = useCallback(() => {
    return !!(username && password)
  }, [username, password])

  const handleSignIn = useCallback(() => {
    signIn({ username, password })
      .then(() => {
        history.replace('/chats')
      })
      .catch(error => {
        setError(error.message || error)
      })
  }, [username, password])

  return (
    <div className="SignInForm">
      <form>
        <legend>Sign in</legend>
        <div style={{ width: '100%' }}>
          <TextField
            className="AuthScreen-text-field"
            label="Username"
            value={username}
            onChange={onUsernameChange}
            margin="normal"
            placeholder="Enter your username"
          />
          <TextField
            className="AuthScreen-text-field"
            label="Password"
            type="password"
            value={password}
            onChange={onPasswordChange}
            margin="normal"
            placeholder="Enter your password"
          />
        </div>
        <Button
          type="button"
          color="secondary"
          variant="contained"
          disabled={!maySignIn()}
          onClick={handleSignIn}
        >
          Sign in
        </Button>
        <div className="AuthScreen-error">{error}</div>
      </form>
    </div>
  )
}