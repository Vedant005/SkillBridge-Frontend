interface Gig {
  _id: string;
  connect_price: Number;
  created_on: Date;

  tz_date: Date;
  duration: String;
  engagement: String;

  freelancers_to_hire: Number;
  amount_amount: Number;

  hourly_rate: Number;

  type: String;
  job_ts: Number;
  proposals_tier: String;

  published_on: Date;
  tier: String;
  title: String;
  uid: Number;
  total_freelancers_to_hire: Number;

  client_company_org_uid: Number;

  client_payment_verification_status: Number;

  client_total_feedback: Number;

  occupations_category_pref_label: String;
  occupations_oservice_pref_label: String;
  client_total_reviews: Number;

  client_total_spent: Number;

  client_location_country: String;
}
//'title', 'type', 'amount_amount', 'hourly_rate', 'duration',
//                'engagement', 'occupations_category_pref_label',
//              'occupations_oservice_pref_label', 'client_total_reviews',
//            'client_total_spent', 'published_on', 'tier', 'total_freelancers_to_hire', 'client_location_country'
function Gigs(gig: Gig) {
  const {
    title,
    type,
    hourly_rate,
    tier,
    client_location_country,
    client_total_reviews,
    published_on,
  } = gig;

  // Format the date properly
  const formattedDate = new Date(published_on).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 transition transform hover:scale-105 hover:shadow-lg w-[500px]">
      <h2 className="text-xl font-bold text-gray-800 truncate text-wrap">
        {title}
      </h2>
      <div className="text-sm text-gray-500 mt-2">{type}</div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-semibold text-green-600">
          ${hourly_rate?.toString() || "N/A"}/hr
        </span>
        <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-md">
          {tier}
        </span>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          📍 {client_location_country || "Unknown"}
        </div>
        <div className="text-sm text-yellow-600">
          ⭐ {client_total_reviews?.toString()} reviews
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        Published on: {formattedDate}
      </div>
    </div>
  );
}

export default Gigs;
