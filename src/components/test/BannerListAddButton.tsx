import Button from '@components/share/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { store } from 'src/remote/firebase'
import { adBanners } from 'src/mock/data.ts'
import { COLLECTIONS } from '@constants/index'

function BanneristAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    adBanners.forEach((banner) => {
      const docRef = doc(collection(store, COLLECTIONS.ADBANNER))

      batch.set(docRef, banner)
    })
    await batch.commit()
    alert('배너 등록이 성공적으로 되었어요')
  }
  return <Button onClick={handleButtonClick}>베너리스트 추가하기</Button>
}
export default BanneristAddButton
