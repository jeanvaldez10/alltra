import { cookies } from "next/headers"
import Image from "next/image"

import { Mail } from "@/components/dashboard/mailbox/mail"
import { accounts, mails } from "@/components/dashboard/mailbox/data"

export default function MailPage() {


  return (
    <>
      <Mail
        accounts={accounts}
        mails={mails}
        defaultLayout={[0]}

        navCollapsedSize={4}
      />

    </>
  )
}