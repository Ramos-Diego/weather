import Head from 'next/head'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  VStack,
  Container,
  Button,
  Input,
  Heading,
  Alert,
  AlertIcon,
} from '@chakra-ui/core'

export default function Home() {
  const { handleSubmit, register, errors } = useForm()
  const [data, setData] = useState({})

  const onSubmit = ({ city }) => {
    fetch(`/api/?city=${city}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <Box bgColor="lightskyblue">
      <Head>
        <title>Weather</title>
      </Head>

      <Container display="grid" alignContent="center" maxW="xs" h="100vh">
        <Heading
          as="h2"
          mb={5}
          color="gray.800"
          fontSize="3rem"
          textAlign="center"
        >
          Weather App
        </Heading>
        <VStack spacing={2} bgColor="lightpink" p={3} borderRadius={4}>
          <Box my="50px">
            <Heading
              as="h1"
              color="gray.800"
              fontSize="2rem"
              textAlign="center"
            >
              {data.temperature ? (<>
              {data.temperature}&deg;C
              <br/>
              {data.city}, {data.country}
              <br/>
              {data.description}
              </>) : <>#&deg;C</>}
            </Heading>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              fontSize="xl"
              name="city"
              placeholder="Enter a city..."
              _placeholder={{
                fontSize: 'xl',
              }}
              ref={register({ required: true })}
              textAlign="center"
            />
            {errors.city && (
              <Alert h="36px" mt={2} status="error" borderRadius={3}>
                <AlertIcon />
                The city is required.
              </Alert>
            )}
            <Button type="submit" mt={6} isFullWidth>
              Get Temperature
            </Button>
          </form>
        </VStack>
      </Container>
    </Box>
  )
}
