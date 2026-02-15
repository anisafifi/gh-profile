/**
 * GitHub username validation utility
 */

/**
 * Validates if a GitHub username exists
 * @param username - GitHub username to validate
 * @returns Promise<boolean> - true if username exists, false otherwise
 */
export const validateGitHubUsername = async (username: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)
    return response.ok
  } catch (error) {
    console.error('Error validating GitHub username:', error)
    return false
  }
}

/**
 * Validates GitHub username and returns detailed result
 * @param username - GitHub username to validate
 * @returns Promise with exists flag and optional error message
 */
export const validateGitHubUsernameDetailed = async (
  username: string
): Promise<{ exists: boolean; error?: string }> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)
    
    if (response.ok) {
      return { exists: true }
    }
    
    if (response.status === 404) {
      return { exists: false, error: 'Username not found' }
    }
    
    if (response.status === 403) {
      return { exists: false, error: 'Rate limit exceeded' }
    }
    
    return { exists: false, error: 'Failed to validate username' }
  } catch (error) {
    console.error('Error validating GitHub username:', error)
    return { exists: false, error: 'Network error occurred' }
  }
}
