declare global {
  interface IPropsDialog {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    onChanged?: (record: IProductRec) => void
  }

  interface IHeader {
    key: string
    title: string
    classes: string
  }

  interface ISorting {
    order: string
    key: string
    isSort: boolean
  }

  interface IRootState {
    isRemember: boolean
  }
}

export {}
