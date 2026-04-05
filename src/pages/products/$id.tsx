import React from 'react'
import { useParams } from 'react-router-dom'

type CatalogDetailParams = {
  id: string
}

const CatalogDetail: React.FC = () => {
  const { id } = useParams<CatalogDetailParams>()

  return (
    <div>
      <h1>Детальная страница товара</h1>
      <p>ID: {id}</p>
    </div>
  )
}

export default CatalogDetail
