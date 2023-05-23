import axios, { AxiosError } from 'axios'
import { sleep } from '../helpers'
import { Issues, Labels, State } from '../interfaces'

interface Props {
  state?: State
  labels: string[]
  page?: number
}

interface QueryProps {
  pageParam?: number
  queryKey: (string | Props)[]
}

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_KEY}`,
  },
})

// obtiene las labels
export const getLabels = async (): Promise<Labels[]> => {
  // await sleep(2)

  const { data } = await githubApi.get<Labels[]>('/labels')
  return data
}

// obtiene las issues
export const getIssues = async ({
  labels,
  page = 1,
  state,
}: Props): Promise<Issues[]> => {
  await sleep(2)

  // vamos a crear el parametro para hacer la llamada respetiva con los labels y state, etc
  const params = new URLSearchParams()

  if (state) params.append('state', state)

  if (labels.length > 0) {
    const labelString = labels.join(',')
    params.append('labels', labelString)
  }

  params.append('page', page.toString())
  params.append('per_page', '5')

  // esto lo que hara es que en la peticion se vea algo asi =
  // = issues?state=open || issues?state=closed
  // y asi pueda filtrar los issues segun el estado
  const { data } = await githubApi.get<Issues[]>('/issues', { params })
  return data
}

export const getIssueInfo = async (
  issueNumber: number
): Promise<Issues | null> => {
  try {
    // await sleep(2)
    const { data } = await githubApi.get<Issues>(`/issues/${issueNumber}`)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null
    }
    throw error
  }
}

export const getIssueComments = async (
  issueNumber: number
): Promise<Issues[]> => {
  // await sleep(2)

  const { data } = await githubApi.get<Issues[]>(
    `/issues/${issueNumber}/comments`
  )
  return data
}

// obtiene las issues con infinite scroll
export const getIssuesInfinite = async ({
  pageParam = 1,
  queryKey,
}: QueryProps): Promise<Issues[]> => {
  const [, , args] = queryKey
  const { labels, state } = args as Props

  // await sleep(2)

  // vamos a crear el parametro para hacer la llamada respetiva con los labels y state, etc
  const params = new URLSearchParams()

  if (state) params.append('state', state)

  if (labels.length > 0) {
    const labelString = labels.join(',')
    params.append('labels', labelString)
  }

  params.append('page', pageParam.toString())
  params.append('per_page', '5')

  // esto lo que hara es que en la peticion se vea algo asi =
  // = issues?state=open || issues?state=closed
  // y asi pueda filtrar los issues segun el estado
  const { data } = await githubApi.get<Issues[]>('/issues', { params })
  return data
}
