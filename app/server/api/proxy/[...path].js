export default defineEventHandler(async (event) => {
  const uRTC = useRuntimeConfig()
  const API_HOST = uRTC?.public?.API_HOST;
  const apiUrl = event.req.url.replace('/api/proxy', API_HOST);
  console.log('apiUrl: ', apiUrl)

  let option = {}
  if (event.req.method === 'POST'){
    option = await readBody(event)
  }
  return await $fetch(apiUrl, option);
});