import { useState, useRef, useEffect } from 'react'

import { type IProductRec, PRODUCT_REC } from '@/entities/product'

const DialogCreate = ({ show, setShow, onChanged }: IPropsDialog) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const [form, setForm] = useState<IProductRec>(structuredClone(PRODUCT_REC))

  const isSaveDisabled = !form.title.trim() || !form.category.trim() || !form.price || !form.sku.trim()

  const onClose = () => {
    setShow(false)
    reset()
  }

  const onSave = () => {
    onChanged?.(form)

    setShow(false)
    reset()
  }

  const reset = () => {
    setTimeout(() => setForm(structuredClone(PRODUCT_REC)), 500)
  }

  useEffect(() => {
    if (show) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [show])

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box w-11/12 max-w-4xl">
        <h3 className="font-bold text-lg mb-4">Добавить товар</h3>

        <div>
          <input
            type="text"
            className={`input mb-5 ${!form.title.trim() ? 'input-error' : ''}`}
            value={form.title}
            placeholder="Введите название"
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          />

          <input
            type="text"
            className={`input mb-5 ${!form.category.trim() ? 'input-error' : ''}`}
            value={form.category}
            placeholder="Введите вендор"
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
          />

          <input
            type="text"
            className={`input mb-5 ${!form.sku.trim() ? 'input-error' : ''}`}
            value={form.sku}
            placeholder="Введите артикул"
            onChange={(e) => setForm((prev) => ({ ...prev, sku: e.target.value }))}
          />

          <input
            type="number"
            className="input mb-5"
            value={form.rating}
            placeholder="Введите оценку"
            onChange={(e) => setForm((prev) => ({ ...prev, rating: Number(e.target.value) }))}
          />

          <input
            type="number"
            className={`input mb-5 ${!form.price ? 'input-error' : ''}`}
            value={form.price}
            placeholder="Введите цена"
            onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
          />
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={onClose}>
              Закрыть
            </button>
          </form>

          <button className="btn btn-primary" onClick={onSave} disabled={isSaveDisabled}>
            Сохранить
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default DialogCreate
