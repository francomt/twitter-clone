import axios from "axios";

//ACTION TYPES
const GET_EXPLORE = "GET_EXPLORE";

const getExplore = (results) => ({
  type: GET_EXPLORE,
  results,
});

const articles = {
  status: 200,
  numResults: 7777404,
  hits: [
    {
      url:
        "https://www.foxnews.com/politics/jessica-tarlov-dnc-missed-opportunity-urban-violence",
      source: "foxnews.com",
      authors: ["Sam Dorman"],
      title:
        "Jessica Tarlov admits DNC was 'missed opportunity' for party to address urban violence, riots",
      pubDate: "2020-08-22T01:12:06+00:00",
      country: "us",
      language: "en",
      description:
        'Democrats are fighting for the soul of the U.S. and are clearly the "empathetic party" in the 2020 election, Fox News contributor Jessica Tarlov argued on "The Story" Friday.',
      imageUrl:
        "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2020/08/696/392/Joe-Biden-DNC-AP-5.jpg?ve=1&tl=1",
      content:
        'Democrats are fighting for the soul of the U.S. and are clearly the "empathetic party" in the 2020 election, Fox News contributor Jessica Tarlov argued on "The Story" Friday.\n\nTarlov conceded to host Martha MacCallum that this week\'s Democratic Natio ... [+3093 chars]',
    },
    {
      url:
        "https://www.scmp.com/abacus/games/article/3098366/retailers-suspend-ring-fit-adventure-pre-orders-china-day-after-sales",
      source: "scmp.com",
      authors: ["Josh Ye"],
      title:
        "Ring Fit Adventure pre-orders suspended in China ahead of official release",
      pubDate: "2020-08-22T05:40:48+00:00",
      country: "",
      language: "en",
      description:
        "JD.com and Tmall received tens of thousands of pre-orders for Ring Fit Adventure before suspending the option on their platforms on Friday.",
      imageUrl:
        "https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_generic/public/d8/images/methode/2020/08/22/1bb4caee-e397-11ea-8e8d-92e5de2d33e5_image_hires_134225.jpg?itok=RbVAPomO&v=1598074951",
      content:
        "The hit Nintendo Switch exercise game Ring Fit Adventure is finally getting an official release in China. Photo: Captured from Weibo",
    },
    {
      url:
        "https://www.grandforksherald.com/news/nation/6628393-Democratic-convention-closing-night-draws-events-biggest-TV-audience",
      source: "grandforksherald.com",
      authors: [" Lisa Richwine / Reuters"],
      title:
        "Democratic convention closing night draws event's biggest TV audience",
      pubDate: "2020-08-22T03:11:00+00:00",
      country: "",
      language: "en",
      description:
        "LOS ANGELES, Aug 21 (Reuters) - The closing night of the virtual Democratic National Convention attracted roughly 24.6 million primetime television viewers, the largest audience of the week, according to data from the Nielsen ratings agency.",
      imageUrl:
        "https://www.fccnn.com/incoming/6626923-f6ba2s-Biden-accepts-2020-Democratic-presidential-nomination/alternates/BASE_LANDSCAPE/Biden%20accepts%202020%20Democratic%20presidential%20nomination",
      content:
        "LOS ANGELES, Aug 21 (Reuters) - The closing night of the virtual Democratic National Convention attracted roughly 24.6 million primetime television viewers, the largest audience of the week, according to data from the Nielsen ratings agency.\n\nThe num ... [+1386 chars]",
    },
    {
      url: "https://www.foxnews.com/media/joe-concha-dnc-show-about-nothing",
      source: "foxnews.com",
      authors: ["Charles Creitz"],
      title:
        "Joe Concha pans DNC as a 'show about nothing' featuring an 'airing of grievances'",
      pubDate: "2020-08-22T01:59:46+00:00",
      country: "us",
      language: "en",
      description:
        'The Democratic National Convention was like "Seinfeld" in that it was a "show about nothing" and featured an "airing of grievances," The Hill media reporter Joe Concha told "Hannity" Friday night.',
      imageUrl:
        "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2020/03/696/392/JOE-CONCHA.jpg?ve=1&tl=1",
      content:
        'The Democratic National Convention was like "Seinfeld" in that it was a "show about nothing" and featured an "airing of grievances," The Hill media reporter Joe Concha told "Hannity" Friday night.\n\nConcha noted that Joe Biden\'s speech accepting his p ... [+1552 chars]',
    },
    {
      url:
        "https://www.foxnews.com/us/charlie-leduff-chicago-mayor-lori-lightfoot-hypocritical",
      source: "foxnews.com",
      authors: ["Charles Creitz"],
      title:
        "Journalist slams 'hypocritical' Chicago mayor for having police keep protesters off her block",
      pubDate: "2020-08-22T00:03:04+00:00",
      country: "us",
      language: "en",
      description:
        'Chicago Mayor Lori Lightfoot is being "hypocritical" by allowing the Chicago Police Department to prevent protesters from demonstrating on the block where she lives, Pulitzer Prize-winning journalist Charlie LeDuff told "The Story" Friday night.',
      imageUrl:
        "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2020/07/696/392/lori-lightfoot-AP.jpg?ve=1&tl=1",
      content:
        'Chicago Mayor Lori Lightfoot is being "hypocritical" by allowing the Chicago Police Department to prevent protesters from demonstrating on the block where she lives, Pulitzer Prize-winning journalist Charlie LeDuff told "The Story" Friday night.\n\n"In ... [+1540 chars]',
    },
    {
      url:
        "https://www.foxnews.com/opinion/laura-ingraham-biden-failed-clear-specific-policies",
      source: "foxnews.com",
      authors: ["Charles Creitz"],
      title:
        "Laura Ingraham bashes Biden, says Dem nominee 'failed to present clear, specific policies' in DNC speech",
      pubDate: "2020-08-22T02:44:26+00:00",
      country: "us",
      language: "en",
      description:
        "Joe Biden's presidential campaign is light on policy, but heavy on platitudes and sweeping statements, Fox News host Laura Ingraham said Friday.",
      imageUrl:
        "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2020/08/696/392/Video-2020-08-21T224308.985.jpg?ve=1&tl=1",
      content:
        'Joe Biden\'s presidential campaign is light on policy, but heavy on platitudes and sweeping statements, Fox News host Laura Ingraham said Friday.\n\nWhen Biden accepted his party\'s nomination Thursday night, the "Ingraham Angle" host said, "he failed to ... [+1490 chars]',
    },
    {
      url:
        "https://www.grandforksherald.com/newsmd/coronavirus/6581858-Active-COVID-19-cases-reach-all-time-high-in-North-Dakota-as-infections-surge-in-Williston-Grand-Forks-metros",
      source: "grandforksherald.com",
      authors: ["Jeremy Turley"],
      title:
        "Active COVID-19 cases reach all-time high in North Dakota as infections surge in Williston, Grand Forks metros",
      pubDate: "2020-07-20T17:16:07+00:00",
      country: "",
      language: "en",
      description:
        "Twenty-two new cases came from Williams County, which has seen a dramatic rise in infections. More than half of the residents ever known to have had the virus during the pandemic were confirmed positive in the last week. The county now has 84 active cases, up 14 from Sunday.",
      imageUrl:
        "https://www.fccnn.com/incoming/4971509-8h6wmd-coronavirus-covid-19-nih4.jpg/alternates/BASE_LANDSCAPE/coronavirus-covid-19-nih4.jpg",
      content:
        "BISMARCK — The North Dakota Department of Health on Monday, July 20, announced 107 new cases of COVID-19, mostly in the state's five largest metro areas.\n\nThere are now 814 North Dakotans known to be infected with the virus, marking a pandemic-high i ... [+3092 chars]",
    },
    {
      url:
        "https://www.grandforksherald.com/incoming/6628570-Kyle-Larson-wins-dramatic-World-of-Outlaws-feature-at-RCS-with-a-last-corner-pass",
      source: "grandforksherald.com",
      authors: ["Wayne J. Nelson"],
      title:
        "Kyle Larson wins dramatic World of Outlaws feature at RCS with a last-corner pass",
      pubDate: "2020-08-22T04:53:16+00:00",
      country: "",
      language: "en",
      description:
        "Kyle Larson said he has heard many great things about River Cities Speedway -- the quarter-mile bullring that has become one of the top racing venues on the World of Outlaws circuit.",
      imageUrl:
        "https://www.grandforksherald.com/incoming/6628440-xxuhss-082220-S-GFH-RACING-KyleLarson01.jpg/alternates/BASE_LANDSCAPE/082220%20S%20GFH%20RACING%20KyleLarson01.jpg",
      content:
        "Kyle Larson said he has heard many great things about River Cities Speedway -- the quarter-mile bullring that has become one of the top racing venues on the World of Outlaws circuit.\n\n“This definitely is a great race track,” said Larson. “I’ve always ... [+3152 chars]",
    },
    {
      url:
        "https://www.thedenverchannel.com/news/local-news/former-aurora-teacher-sentenced-to-90-days-in-jail-for-sexually-assaulting-one-of-his-students",
      source: "thedenverchannel.com",
      authors: ["By: Óscar Contreras"],
      title:
        "Former Aurora teacher sentenced to 90 days in jail for sexually assaulting one of his students",
      pubDate: "2020-08-21T19:16:00+00:00",
      country: "us",
      language: "en",
      description:
        "A former teacher at Vista PEAK Preparatory School in Aurora was sentenced to 90 days in jail for sexually assaulting one of his students over a two-year period.",
      imageUrl:
        "https://ewscripps.brightspotcdn.com/20/b5/c29403df4fe18c29eb06309825ee/gabriel-alsina-new-mug.jpg",
      content:
        "AURORA, Colo. – A former teacher at Vista PEAK Preparatory School in Aurora was sentenced to 90 days in jail for sexually assaulting one of his students over a two-year period.\n\nGabriel Alsina, 37, will also serve five years of sex offender intensive ... [+1298 chars]",
    },
    {
      url:
        "https://www.foxnews.com/us/prosecutors-suggest-more-charges-could-be-coming-in-epstein-maxwell-investigation",
      source: "foxnews.com",
      authors: ["Louis Casiano"],
      title:
        "Prosecutors suggest more charges could be coming in Epstein, Maxwell investigation",
      pubDate: "2020-08-21T22:35:44+00:00",
      country: "us",
      language: "en",
      description:
        "Federal prosecutors suggested Friday that a federal grand jury investigation into the late Jeffrey Epstein, Ghislaine Maxwell and others alleged to have participated in the sexual abuse of underage girls remains active, indicating more criminal charges could be on the way.",
      imageUrl:
        "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2020/08/696/392/Ghislaine-Maxwell-Getty.jpg?ve=1&tl=1",
      content:
        "Federal prosecutors suggested Friday that a federal grand jury investigation into the late Jeffrey Epstein, Ghislaine Maxwell and others accused in the sexual abuse of underage girls remains active, indicating more criminal charges could be on the wa ... [+2771 chars]",
    },
    {
      url: "https://decider.com/2020/08/21/sexiest-anime-movies-shows-netflix/",
      source: "decider.com",
      authors: ["Meghan O'Keefe"],
      title: "The Sexiest Anime Movies and Shows on Netflix",
      pubDate: "2020-08-22T01:00:09+00:00",
      country: "gb",
      language: "en",
      description: "No tentacles were harmed in the making of this list.",
      imageUrl:
        "https://decider.com/wp-content/uploads/2020/08/Sexiest-Anime-on-Netflix-2.jpg?quality=90&strip=all&w=1200",
      content: "Click to email this to a friend (Opens in new window)",
    },
    {
      url:
        "https://www.pressherald.com/2020/08/21/business-owners-who-sued-mills-over-pandemic-restrictions-to-appeal-dismissal/",
      source: "pressherald.com",
      authors: [],
      title:
        "Business owners who sued Mills over pandemic restrictions to appeal dismissal",
      pubDate: "2020-08-22T00:37:05+00:00",
      country: "us",
      language: "en",
      description:
        "Rick Savage, the owner of Sunday River Brewing Co. and one of the original plaintiffs, is not among those listed on the notice to appeal filed with the 1st U.S. Circuit Court of Appeals in Boston.",
      imageUrl:
        "https://multifiles.pressherald.com/uploads/sites/10/2019/12/COURTS.jpg",
      content:
        "Some of the business owners who challenged Gov. Janet Mills’ restrictions on reopening have filed a notice that they plan to appeal dismissal of their lawsuit.\n\nThe owners filed a federal lawsuit against Mills, asking a judge to declare the restricti ... [+1297 chars]",
    },
    {
      url:
        "https://www.foxnews.com/entertainment/larry-king-26-year-age-gap-ex-taking-toll",
      source: "foxnews.com",
      authors: ["Nate Day"],
      title:
        "Larry King says 26-year age gap, religion took 'its toll' on marriage, ultimately led to divorce",
      pubDate: "2020-02-06T03:51:28+00:00",
      country: "us",
      language: "en",
      description:
        "The television personality has married eight times -- twice to the same woman -- and is on his way to his eighth divorce.",
      imageUrl:
        "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2019/08/696/392/Larry-King-Shawn-King-GettyImages-1077919256.jpg?ve=1&tl=1",
      content:
        'Larry King is speaking out about the downfall of his marriage to Shawn Southwick, saying religion and their 26-year-year age gap eventually took "its toll" on their relationship.\n\nThe television personality has married eight times — twice to the same ... [+2158 chars]',
    },
    {
      url:
        "https://www.reviewjournal.com/opinion/letters/letter-more-school-choice-doesnt-look-so-bad-now-does-it-2101115/",
      source: "reviewjournal.com",
      authors: ["Gabe Spiezio Las Vegas"],
      title: "LETTER: More school choice doesn’t look so bad now, does it?",
      pubDate: "2020-08-22T04:00:00+00:00",
      country: "us",
      language: "en",
      description: "Clark County parents need options during pandemic.",
      imageUrl:
        "https://www.reviewjournal.com/wp-content/uploads/2020/08/14102280_web1_studentsweb.jpg?w=700",
      content:
        "In response to the Sunday article, “Parents of CCSD kids battle with child care”:\n\nI hope everyone in Clark County, the state of Nevada and the entire country are paying close attention to the boondoggled attempt by our leaders to address the issue o ... [+1295 chars]",
    },
    {
      url:
        "https://www.foxnews.com/politics/biden-campaign-70-million-democratic-convention",
      source: "foxnews.com",
      authors: ["Paul Steinhauser"],
      title: "Biden campaign hauls in $70 million during Democratic convention",
      pubDate: "2020-08-22T02:12:56+00:00",
      country: "us",
      language: "en",
      description:
        "It remains to be seen if Joe Biden gets a boost in the polls coming out of the Democratic National Convention, but the party’s presidential nominee did get boost in his fundraising.",
      imageUrl:
        "https://a57.foxnews.com/cf-images.us-east-1.prod.boltdns.net/v1/static/694940094001/d756148c-17a6-4b03-9968-613835e4f404/fad006e5-f7c9-4866-b927-fa32e1fd2a53/1280x720/match/696/392/image.jpg?ve=1&tl=1",
      content:
        "It remains to be seen if Joe Biden gets a bounce in the polls coming out of the Democratic National Convention, but the party’s presidential nominee did get boost in his fundraising.\n\nThe former vice president’s campaign announced on Friday that it,  ... [+3184 chars]",
    },
    {
      url:
        "https://www.foxnews.com/us/former-green-beret-charged-espionage-with-russia",
      source: "foxnews.com",
      authors: ["Associated Press"],
      title: "Former Green Beret charged spying for Russia",
      pubDate: "2020-08-22T01:10:07+00:00",
      country: "us",
      language: "en",
      description:
        "A former Army Green Beret living in northern Virginia was arrested on Friday, charged with divulging military secrets about his unit's activities in former Soviet republics.",
      imageUrl:
        "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2020/08/696/392/5fce241b-AP20234774186843.jpg?ve=1&tl=1",
      content:
        "FALLS CHURCH, Va. — A former Army Green Beret living in northern Virginia was arrested Friday, charged with divulging military secrets about his unit's activities in former Soviet republics during more than a decade of contacts with Russian intellige ... [+4997 chars]",
    },
    {
      url:
        "https://www.thesun.ie/fabulous/5812178/meet-donegal-man-who-quit-job-as-accountant-to-become-a-traditional-rabbit-catcher-and-is-last-one-in-ireland/",
      source: "thesun.ie",
      authors: ["Aoife Bannon"],
      title:
        "Meet Donegal man who quit job as accountant to become rabbit catcher",
      pubDate: "2020-08-22T07:00:00+00:00",
      country: "gb",
      language: "en",
      description:
        "Meet Donegal man who quit job as accountant to become a traditional rabbit catcher – and is last one in I",
      imageUrl:
        "https://www.thesun.ie/wp-content/uploads/sites/3/2020/08/Wabbit.jpg?strip=all&quality=100&w=1010&h=708&crop=1",
      content:
        "MEET the man who quit his job as an accountant to become a traditional rabbit catcher — the last in Ireland.\n\nSteven McGonigal uses ferrets, dogs, spades and nets instead of guns and poison to control rabbit populations.\n\nSteven is said to be Ireland ... [+1694 chars]",
    },
    {
      url:
        "https://www.plymouthherald.co.uk/news/plymouth-news/police-bodyworn-video-camera-bwv-4437226",
      source: "plymouthherald.co.uk",
      authors: ["", "Carl Eve"],
      title: "The rise of police body worn video and how it's keeping us safe",
      pubDate: "2020-08-22T04:00:00+00:00",
      country: "gb",
      language: "en",
      description:
        "The 'filmers' are now being filmed - and police say the body cameras are as valuable to them as any other bit of kit",
      imageUrl:
        "https://i2-prod.plymouthherald.co.uk/incoming/article4446603.ece/ALTERNATES/s1200/48911970_2014-05-09_Constable-Yasa-Amerat-left-and.jpg",
      content:
        "Since Sir Robert Peel established the London Metropolitan Police in 1829, the uniform and kit has adapted and changed with policing needs, circumstances and technology. The whistle, truncheon, lamp, notebook and pen was just the beginning of an ever- ... [+18906 chars]",
    },
    {
      url:
        "https://nypost.com/2020/08/22/sen-martha-mcsally-asks-supporters-to-fast-for-a-meal/",
      source: "nypost.com",
      authors: ["Vincent Barone"],
      title:
        "Arizona Senator asks her supporters to ‘fast a meal’ to contribute to campaign",
      pubDate: "2020-08-22T06:23:41+00:00",
      country: "gb",
      language: "en",
      description:
        "Sen. Martha McSally (R-AZ) told an audience at a recent northern Arizona event that she needed more cash to fight off a tough challenge from her Democratic opponent, Mark Kelly, according to a clip published Friday by AZFamily.com.",
      imageUrl:
        "https://nypost.com/wp-content/uploads/sites/2/2020/08/AP20224836910684-e1598076856761.jpg?quality=90&strip=all&w=1200",
      content:
        "A down-in-the polls senator from Arizona is asking her supporters to “fast” for one meal — and give her campaign the cash.\n\nSen. Martha McSally (R-AZ) told an audience at a recent northern Arizona event that she needed more cash to fight off a tough  ... [+1494 chars]",
    },
    {
      url:
        "https://www.bostonglobe.com/news/world/2020/08/21/kremlin-critic-navalny-cleared-for-transfer-germany-allies-claim-russian-attempt-cover-poisoning/WoxHqC8ooiL5S6TB4l0IVP/story.html",
      source: "bostonglobe.com",
      authors: ["Isabelle Khurshudyan"],
      title:
        "Kremlin critic Navalny flown to Germany for treatment as allies claim Russian attempt to cover up poisoning - The Boston Globe",
      pubDate: "2020-08-21T21:33:41.689000+00:00",
      country: "us",
      language: "en",
      description:
        "Gravely ill Kremlin critic Alexei Navalny was flown out to Germany for treatment early Saturday, ending a standoff between doctors and Navalny allies who accuse Russian officials of attempting to cover up a suspected poisoning of the country’s most prominent opposition leader.",
      imageUrl:
        "https://www.bostonglobe.com/pf/resources/images/logo-bg.jpg?d=192",
      content:
        "Alexander Murakhovsky, chief physician at Omsk Emergency Hospital No. 1, said Friday that Navalny could be transferred to German care. Earlier in the day, he said the 44-year-old Navalny was not well enough to be moved.\n\nThe decision to allow Navalny ... [+1814 chars]",
    },
    {
      url:
        "https://www.la-croix.com/Monde/crise-sanitaire-Covid-19-fait-reculer-Jour-depassement-trois-semaines-2020-08-22-1201110256",
      source: "la-croix.com",
      authors: ["La-Croix.com"],
      title:
        "La crise sanitaire du Covid-19 a fait reculer le « Jour du dépassement » de trois semaines",
      pubDate: "2020-08-22T06:34:08+00:00",
      country: "fr",
      language: "fr",
      description:
        "L’humanité aura consommé, samedi 22 août, l’ensemble des ressources naturelles que la planète peut renouveler en une année, selon l’institut de recherches international Global Footprint Network. Ce « Jour du dépassement » a reculé de trois semaines en 2020 en raison de la baisse des activités humaines liée à l’épidémie de Covid-19.",
      imageUrl:
        "https://img.aws.la-croix.com/2020/08/22/1201110256/depassement-2020-infog-2_0_729_535.jpg",
      content:
        "Cette année le « Jour du dépassement de la Terre » tombe le samedi 22 août, selon une étude de l’institut de recherches international Global Footprint Network relayée par l’ONG WWF. Cette date marque le jour où l’humanité a consommé toutes les ressou ... [+2732 chars]",
    },
    {
      url:
        "https://www.pressherald.com/2020/07/17/maine-unemployment-rate-dips-to-under-7-percent-in-june/",
      source: "pressherald.com",
      authors: [],
      title: "Maine unemployment rate dipped below 7% in June",
      pubDate: "2020-07-17T15:40:07+00:00",
      country: "us",
      language: "en",
      description: "",
      imageUrl:
        "https://multifiles.pressherald.com/uploads/sites/10/2020/05/shutterstock_727606729.jpg",
      content:
        "Maine continues to have the lowest unemployment rate in New England, but the estimated figure of just under 7 percent for June fails to capture the extent of people who are out of work because of the coronavirus pandemic.\n\nThe state’s estimated joble ... [+4506 chars]",
    },
    {
      url:
        "https://www.thesun.co.uk/news/12469314/daisy-coleman-suicide-rape-unable-children-mom/",
      source: "thesun.co.uk",
      authors: ["Katy Forrester"],
      title:
        "Daisy Coleman killed herself after finding out she couldn't have kids, says mom",
      pubDate: "2020-08-21T22:03:54+00:00",
      country: "gb",
      language: "en",
      description:
        "MELINDA Coleman has been left heartbroken by the death of her only daughter, 23, who she says shot herself on FaceTime in front of her boyfriend. In an exclusive interview with The Sun, she pays tribute to her daughter whose life was changed after she was allegedly raped in high school.",
      imageUrl:
        "https://www.thesun.co.uk/wp-content/uploads/2020/08/DAISYCOLEMAN_COMP.jpg?strip=all&quality=100&w=1200&h=800&crop=1",
      content:
        "DAISY Coleman's heartbroken mother says she took her own life after finding out she couldn't have children, likely caused by her teen rape, The Sun can reveal.\n\nIn an exclusive interview, grieving Melinda Coleman said 23-year-old Daisy had visited a  ... [+6457 chars]",
    },
    {
      url:
        "https://nypost.com/2020/08/22/grand-canyon-cliff-collapse-reveals-313-million-year-old-fossilized-tracks/",
      source: "nypost.com",
      authors: ["Jack Hobbs"],
      title:
        "Grand Canyon cliff collapse reveals 313 million year old fossilized tracks",
      pubDate: "2020-08-22T05:51:51+00:00",
      country: "gb",
      language: "en",
      description:
        "Krill happen to see the tracks lying in plain sight after the boulder that contained them had split open after a cliff collapse at the Manakacha Formation.",
      imageUrl:
        "https://nypost.com/wp-content/uploads/sites/2/2020/08/Grand_canyon.jpg?quality=90&strip=all&w=1200",
      content:
        "Some 313 million years ago, two animals crossed a sand dune in what would become the Grand Canyon — and now, paleontologists say that chance crossing has been preserved as the national park’s oldest fossilized vertebrate tracks.\n\nThe tracks had surfa ... [+1249 chars]",
    },
    {
      url:
        "https://www.plymouthherald.co.uk/news/plymouth-news/plymouth-moor-view-mp-johnny-4448131",
      source: "plymouthherald.co.uk",
      authors: ["", "Lee Trewhela"],
      title: "MP Johnny Mercer shares nasty injury after canoeing trip",
      pubDate: "2020-08-21T19:57:31+00:00",
      country: "gb",
      language: "en",
      description:
        "The defence minister shared news of his injury on social media",
      imageUrl:
        "https://i2-prod.plymouthherald.co.uk/incoming/article3087161.ece/ALTERNATES/s1200/3_GMP_DCM_110719JohnnyMercer_16JPG.jpg",
      content:
        "Plymouth Moor View Conservative MP Johnny Mercer has admitted he’s 'not good at canoeing' after sustaining an injury while out on the Tamar river.\n\nThe defence minister was unable to defend himself and ended up with a cut above his eye.\n\nGiving the t ... [+1277 chars]",
    },
  ],
};

export const fetchExplore = () => {
  return async (dispatch) => {
    try {
      dispatch(getExplore(articles));
    } catch (error) {
      console.error(error);
    }
  };
};

const defaultState = [];

function exploreReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_EXPLORE:
      return action.results;
    default:
      return state;
  }
}

export default exploreReducer;
