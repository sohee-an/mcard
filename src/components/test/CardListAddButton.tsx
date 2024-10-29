import Button from '@components/share/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { store } from 'src/remote/firebase'
import { card_list } from 'src/mock/data.ts'
import { COLLECTIONS } from '@constants/index'
function CardListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD))

      batch.set(docRef, card)
    })
    await batch.commit()
    alert('카드 등록이 성공적으로 되었어요')
  }
  return <Button onClick={handleButtonClick}>카드리스트 추가하기</Button>
}
export default CardListAddButton
