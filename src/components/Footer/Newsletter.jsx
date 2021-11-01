import { CheckIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { CircularProgress } from '@chakra-ui/progress';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

export default function Newsletter() {
  const onFormSubmit = (e, subscribe) => {
    e.preventDefault();
    const email = e.target?.email?.value;
    if (!email || email === '') return;

    subscribe({ EMAIL: email });
  };



  return (
    <div className="r">
      <h3>Don't miss a thing</h3>
      <p>Join the waiting list and be the first one on the platform</p>
      <MailchimpSubscribe
        url={process.env.REACT_APP_NEWSLETTER_SUBSCRIBE_URL}
        render={({ subscribe, status, message }) => (
          <form onSubmit={(e) => onFormSubmit(e, subscribe)}>
            <input type="email" name="email" placeholder="Email address" />
            <button>
              {!status && 'Subscribe'}
              {status === 'sending' && <>Loading... <CircularProgress color="black" size={3} style={{ position: 'relative', top: '-1px' }} isIndeterminate /></>}
              {(status === 'error' && !message?.includes('already subscribed')) && <>Error <WarningTwoIcon w={3} h={3} style={{ position: 'relative', top: '-1px' }} /></>}
              {(status === 'success' || message?.includes('already subscribed')) && <>Subscribed <CheckIcon w={3} h={3} style={{ position: 'relative', top: '-1px' }} /></>}
            </button>
          </form>
        )}
      />
    </div>
  );
}

// Subscribe
