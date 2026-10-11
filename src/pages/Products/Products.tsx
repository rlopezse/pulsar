import ProductGrid from '../../components/ProductGrid/ProductGrid'
import Filter from '../../components/Filter/Filter'

import s from './Products.module.scss'

function Products() {
  return (
    <div className={s.ft_container}>
      <section className={s.ft_sidebar}>
        <Filter />
      </section>
      <section className={s.ft_grid}>
        <ProductGrid />
      </section>
    </div>
  )
}

export default Products
