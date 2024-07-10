import { useEffect, useRef, useState } from 'react';
import './animations.css';
import axios from 'axios';
import { API_URL } from '../../utils'
import Leaderboard from '../Leaderboard';
import madTapIsto from '../../assets/madtapisto.png';
import previewBg from '../../assets/previewBg.jpg';
import omniLogo from '../../assets/omniLogo.svg';
import centralCee from '../../assets/centralCee.png'
import WheelSpin from '../WheelSpin/WheelSpin';
import badge from '../../assets/badgeOne.png';
import leftBadge from '../../assets/badgeTwo.png';
import rightBadge from '../../assets/badgeThree.png'
import referral from '../../assets/referral.png';
import task from '../../assets/task.png';
import ReferralPopup from '../ReferralPopup';
import { toast } from 'react-toastify';
import GoldCoinIcon from '../GoldCoinIcon';
import RangeInput from '../RangeInput/RangeInput';
import TimesIconRed from '../TimesIconRed';
import ChevronDown from '../ChevronDown';
import WheelSpinNew from '../WheelSpin/WheelChart';

const brightColors = [
  { name: "Electric Lime", code: "#CCFF00" },
  { name: "Laser Lemon", code: "#FFFF66" },
  { name: "Shocking Pink", code: "#FC0FC0" },
  { name: "Outrageous Orange", code: "#FF6E4A" },
  { name: "Neon Carrot", code: "#FFA343" },
  { name: "Razzle Dazzle Rose", code: "#FF33CC" },
  { name: "Electric Blue", code: "#7DF9FF" },
  { name: "Blazing Yellow", code: "#FFD700" },
  { name: "Radical Red", code: "#FF355E" },
  { name: "Cyber Grape", code: "#58427C" },
  { name: "Sizzling Sunrise", code: "#FFDB00" },
  { name: "Screamin' Green", code: "#76FF7A" },
  { name: "Illuminating Emerald", code: "#319177" },
  { name: "Fluorescent Orange", code: "#FFBF00" },
  { name: "Gargoyle Gas", code: "#FFFF66" },
  { name: "Luminous Lemon", code: "#FDFF00" },
  { name: "Infra Red", code: "#FF496C" },
  { name: "Ultra Violet", code: "#5F00BA" },
  { name: "Jasmine", code: "#F8DE7E" },
  { name: "Bright Magenta", code: "#FF007F" },
  { name: "Purple Pizzazz", code: "#FE4EDA" },
  { name: "Vivid Sky Blue", code: "#00CCFF" },
  { name: "Electric Violet", code: "#8F00FF" },
  { name: "Vivid Tangerine", code: "#FFA089" },
  { name: "Neon Green", code: "#39FF14" }
];

const gradients = [
  'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
  'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600',
  'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500',
  'bg-gradient-to-r from-blue-500 via-teal-400 to-green-500',
  'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500',
  'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500',
  'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
  'bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500',
  'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500',
  'bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500',
  'bg-gradient-to-r from-green-500 via-yellow-500 to-red-500',
  'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500',
  'bg-gradient-to-r from-blue-500 via-green-400 to-yellow-500',
  'bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500',
  'bg-gradient-to-r from-orange-500 via-pink-500 to-red-500'
];



const AnimatedBackground = () => {
  const [helixColor, setHelixColor] = useState('white');
  const [pointsNo, setPointsNo] = useState(1);
  const [rangeValue, setRangeValue] = useState(66);
  const [bgGradient, setBgGradient] = useState('bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500')
  const [currentView, setCurrentView] = useState('')
  const [user, setUser] = useState<Telegram.InitDataUser | null>(null);
  const [gamePlayPoints, setGamePlayPoints] = useState(0)
  const [referralCode, setReferralCode] = useState('Not Available');
  const [referralPoints, setReferralPoints] = useState(0)
  const [leaderboardData, setLeaderboardData] = useState<any>([])
  const [leaderboardLoading, setLeaderboardLoading] = useState<boolean>(false)
  const [startPlay, setStartPlay] = useState(false);
  const [playerLevel, setPlayerLevel] = useState('Rookie');
  const [referralRewardDeets, setReferralRewardDeets] = useState<any>();
  const [socialRewardDeets, setSocialRewardDeets] = useState<any>();
  const [earnView, setEarnView] = useState('milestones');
  const [totalSpins, setTotalSpins] = useState(0);
  const [lastTotalSpinClaim, setLastTotalSpinClaim] = useState(0);
  const [engageLike, setEngageLike] = useState(false);
  const [engageRepost, setEngageRepost] = useState(false);
  const [engageTelegram, setEngageTelegram] = useState(false);
  const [engageFollow, setEngageFollow] = useState(false);
  const [engageDiscord, setEngageDiscord] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [updateSpins, setUpdateSpins] = useState({
    run: false,
    spinsLeft: 0
  })

  // clipboard.js
  function copyToClipboard(value: any) {
    // Check if the Clipboard API is supported
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value)
        .then(() => {
          toast.success('Referral code copied to clipboard');
        })
        .catch(err => {
          console.log(err)
          toast.error('Could not copy referral code');
        });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = value;

      // Avoid scrolling to the bottom of the page when focusing the textarea
      textArea.style.position = "fixed";
      textArea.style.top = "-99999px";
      textArea.style.left = "-99999px";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        toast.success('Referral code copied to clipboard');
      } catch (err) {
        console.log(err)
        toast.error('Could not copy referral code');
      }

      document.body.removeChild(textArea);
    }
  }

  useEffect(() => {
    // Ensure the Telegram Web Apps SDK is ready
    Telegram.WebApp.ready();

    // Access the user information
    const userInfo = Telegram.WebApp.initDataUnsafe.user;

    // Check if the user information is available
    if (userInfo) {
      console.log({userInfo, url: window.location.href});
      setUser(userInfo);
    } else {
      console.log('No user information available.');
      setUser({
        allows_write_to_pm: true,
        first_name: "Qanda",
        id: 1354055384,
        language_code: "en",
        last_name: "Sensei",
        username: "qandasensei"
      })
    }
  }, []);

  useEffect (() => {
    const fetchUserData = async () => {
      const getUserData = await axios.post(`${API_URL}/get-user-data`, {user})
      console.log({getUserData})
      setGamePlayPoints(getUserData?.data?.userData?.pointsNo)
      if (getUserData?.data?.userData?.referralCode) setReferralCode(getUserData?.data?.userData?.referralCode)
      if (getUserData?.data?.userData?.referralPoints) setReferralPoints(getUserData?.data?.userData?.referralPoints)
      if (getUserData?.data?.userData?.referralRewardDeets) setReferralRewardDeets(getUserData?.data?.userData?.referralRewardDeets)
      if (getUserData?.data?.userData?.socialRewardDeets) setSocialRewardDeets(getUserData?.data?.userData?.socialRewardDeets)
      if (getUserData?.data?.userData?.lastTotalSpinClaim) setLastTotalSpinClaim(getUserData?.data?.userData?.lastTotalSpinClaim)
      if (getUserData?.data?.userData?.totalSpins) setTotalSpins(getUserData?.data?.userData?.totalSpins)
    }
    if (user) {
      fetchUserData();
    }
  }, [user])

  useEffect (() => {
    const fetchLeaderboardData = async () => {
      setLeaderboardLoading(true)
      const getLeaderboardData = await axios.post(`${API_URL}/leaderboard-data`, {})

      const sortedData = getLeaderboardData.data.leaderboardData.map((board: any) => {
        return {
          id: board.user.id, 
          name: board.user.username ? board.user.username : board.user.first_name, 
          points: board.pointsNo, 
          referrals: board.referralPoints, 
          total: board.totalPoints
        }
      })

      console.log({sortedData})

      setLeaderboardData(sortedData)
      setLeaderboardLoading(false)
    }
    fetchLeaderboardData();
  }, [])

  const setRewardClaim = async (deet: any) => {
    try {
      const sendClaim = await axios.put(`${API_URL}/updateReferralReward`, {user, claimTreshold: deet.claimTreshold})

      if (sendClaim?.data?.referralRewardDeets) setReferralRewardDeets(sendClaim?.data?.referralRewardDeets)
      if (sendClaim?.data?.pointsNo) setGamePlayPoints(sendClaim?.data?.pointsNo)
      console.log(sendClaim)
      toast.success('Claimed successfully');
    } catch (error) {
      console.log(error)
      toast.error('Error while claiming');
    }
    
  }

  const setMilestoneRewardClaim = async (lastTotalSpinClaimNo: any, rewardValue: any) => {
    console.log({lastTotalSpinClaimNo, rewardValue})
    try {
      const sendClaim = await axios.put(`${API_URL}/updateMilestoneReward`, {user, lastTotalSpinClaim: lastTotalSpinClaimNo, rewardValue})

      if (sendClaim?.data?.pointsNo) setGamePlayPoints(sendClaim?.data?.pointsNo)
      if (sendClaim?.data?.totalSpins) setTotalSpins(sendClaim?.data?.totalSpins)
      if (sendClaim?.data?.lastTotalSpinClaim) setLastTotalSpinClaim(sendClaim?.data?.lastTotalSpinClaim)
      console.log({sendClaim})
      toast.success('Claimed successfully');
    } catch (error) {
      console.log(error)
      toast.error('Error while claiming');
    }
  }

  const claimExtraSpins = async (spins: number, taskType: string) => {
    console.log({user, spins, taskType})

    try {
      const sendClaim = await axios.post(`${API_URL}/update-spins`, {user, extraSpins: spins})
      const sendSocialClaim = await axios.put(`${API_URL}/updateSocialReward`, {user, claimTreshold: taskType})

      console.log({sendSocialClaim})
      toast.success('Claimed successfully');
      setUpdateSpins({
        run: true,
        spinsLeft: sendClaim?.data?.updatedUser?.spinsLeft
      })
      setSocialRewardDeets(sendSocialClaim?.data?.socialRewardDeets)
      if (taskType === 'like') setEngageLike(false)
      if (taskType === 'repost') setEngageRepost(false)
      if (taskType === 'telegram') setEngageTelegram(false)
      if (taskType === 'follow') setEngageFollow(false)
      if (taskType === 'discord') setEngageDiscord(false)
    } catch (error) {
      console.log(error)
      toast.error('Error while claiming');
    }
  }

  const handlePlayerLevel = (e: any) => {
    if (e <= 500000) return 'Rookie';
    if (e > 500000 && e <= 1250000) return 'Beginner';
    if (e > 1250000 && e <= 3500000) return 'Skilled';
    if (e > 3500000 && e <= 7000000) return 'Expert';
    if (e > 7000000 && e <= 21000000) return 'Legendary';
    if (e > 21000000) return 'Titan';
  }

  const socialsBg = earnView === 'socials' ? {backgroundColor: 'rgba(0, 0, 0, 0.32)'} : {}
  const milestonesBg = earnView === 'milestones' ? {backgroundColor: 'rgba(0, 0, 0, 0.32)'} : {}

  return (
    <div className={`w-full min-h-screen animate-moveBackground bg-cover bg-center`}>
      {
        !startPlay ?
        <div className="flex flex-col justify-between items-center gap-4 h-screen bg-center bg-cover" style={{backgroundImage: `url('${previewBg}')`}}>
          <div className="py-6">
            {/*<img src={omniLogo} alt="" className="mx-auto w-full" />*/}
          </div>
          <div className="flex flex-col justify-center items-center w-full py-4">
            <button className="py-2 px-6 rounded-full font-neuropol bg-[#fffccf] text-[#a76602] font-bold border border-[#FFF] w-[50vh]" onClick={() => setStartPlay(!startPlay)}>
              PLAY
            </button>
            <p className="font-neuropol text-[#FFF] flex justify-center items-center mx-auto w-auto text-center">Dive in to earn daily gold points</p>
          </div>
        </div> :
        <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: `url('${madTapIsto}')`}}>
          
          <div className="bg-black bg-opacity-50 rounded-lg p-3 my-1 w-[90%] mx-auto gap-1 text-[#FFF] justify-center items-center font-neuropol text-[8px] flex justify-between cursor-pointer" onClick={() => setShowAnnouncement(!showAnnouncement)}>
              <p>New Announcement, click to reveal.</p>
              <ChevronDown />
            </div>
          {
            showAnnouncement &&
            <div className="flex flex-col bg-black bg-opacity-50 rounded-lg p-3 my-1 w-[90%] mx-auto gap-1 text-[#FFF] justify-center items-center font-neuropol text-xs">
              <p>You can now earn 250,000 Gold for every referrals that you have on Omnispin.</p>
              <p>You also get 1M Gold as bonus as an early participant. Spin the Wheel of Luck and start earning Gold immediately.</p>
            </div>
          }

          <div className="flex flex-col h-[80vh] gap-3 overflow-y-scroll">
            <WheelSpin user={user} playerLevel={playerLevel} gamePlayPoints={gamePlayPoints} handleGamePointsUpdate={(e: any) => setGamePlayPoints(e)} updateSpins={updateSpins} />
          </div>

          <div className="w-full mx-auto h-auto py-3 absolute bottom-0 fixed">
            <div className="flex flex-col items-center justify-center h-auto w-[90%] mx-auto rounded-tl-lg rounded-tr-lg font-neuropol"  style={{backgroundColor: '#0e02a4'}}>
              {
                currentView === 'stats' &&
                <div className="flex flex-col h-[60vh] overflow-y-scroll w-full py-3 gap-2">
                  <div className="flex w-full justify-end">
                    <div className="w-auto cursor-pointer pr-6" onClick={() => setCurrentView('')}>
                      <TimesIconRed />
                    </div>
                  </div>
                  <div className="w-[90%] sm:w-[70%] md:w-[50%] mx-auto gap-2 my-3">
                    <p className="text-center text-white w-full font-bold">Stats</p>
                  </div>

                  <div className="flex w-full mx-auto px-2 h-[10vh] justify-center items-center gap-3">
                    <img src={leftBadge} alt="" />
                    <img src={badge} alt="" />
                    <img src={rightBadge} alt="" />
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <p className="text-xs text-white">Your Current Rank</p>
                    <div className="flex gap-4 items-center justify-center w-full">
                      <GoldCoinIcon />
                      <h1 className="font-neuropol text-white text-md font-bold">{handlePlayerLevel(gamePlayPoints)}</h1>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center w-full">
                    <p className="w-full items-center justify-center text-center text-white mt-1" style={{backgroundColor: 'rgba(0, 0, 0, 0.25)'}}>Leaderboard</p>

                    {
                      leaderboardLoading &&
                      <>
                        <div className="flex items-center justify-center text-center text-white my-3">
                          <p className="text-center text-lg my-3 mx-auto w-auto text-[#FFF]">Loading leaderboard....</p>
                        </div>
                        
                      </>
                    }
                    {
                      !leaderboardLoading && leaderboardData && leaderboardData.map((board: any) => (
                        <div className="flex w-full px-2 gap-2 my-1">
                          <p className="flex justify-start text-[10px] text-[#FFF] w-1/3">{board.name}</p>
                          <p className="flex justify-center text-[10px] text-[#FFF] w-1/3">{board.points}</p>
                          <p className="flex justify-end text-[10px] text-[#FFF] w-1/3">{board.referrals} Invites</p>
                        </div>
                      ))
                    }
                  </div>
                </div>
              }
              {
                currentView === 'referrals' &&
                <div className="flex flex-col h-[60vh] overflow-y-scroll w-full py-3">
                  <div className="flex w-full justify-end">
                    <div className="w-auto cursor-pointer pr-6" onClick={() => setCurrentView('')}>
                      <TimesIconRed />
                    </div>
                  </div>
                  <div className="flex w-[90%] sm:w-[70%] md:w-[50%] mx-auto gap-2 my-3">
                    <div className="w-[40%]">
                    <button className="font-neuropol py-2 text-[#000] rounded text-xs w-full" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} onClick={() => {copyToClipboard(`https://t.me/omni_spin_bot?start=${referralCode}`)}}>Copy Link</button>
                    </div>
                    <p className="flex items-center justify-start text-white w-[60%] font-bold">Invite</p>
                  </div>
                  
                  

                  {
                    referralRewardDeets &&
                    referralRewardDeets.map((deet: any) => (
                      <div className="flex w-[90%] sm:w-[70%] md:w-[50%] mx-auto gap-2 my-3 rounded-md p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.56)'}}>
                        <div className="w-[10%]">
                          <img src={referral} alt="Referral" className="w-[5vh]" />
                        </div>
                        <div className="w-[90%] flex flex-col">
                          <div className="flex justify-between">
                            <div className="flex flex-col">
                              <p className="text-white text-xs">{deet.claimTreshold} invites</p>
                              <div className="flex">
                                <div className="w-full text-xs text-[#E8BC6A]">{deet.claimTreshold * 10000} Gold</div>
                              </div>
                            </div>
                            <div className="flex justify-center items-center">
                              {
                                referralPoints >= deet.claimTreshold && !deet.rewardClaimed ?
                                <button className="font-neuropol px-4 py-2 bg-[#00B806] text-white text-xs rounded" onClick={() => setRewardClaim(deet)}>Claim</button> :
                                deet.rewardClaimed ? 
                                <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Completed</button> :                                
                                <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Claim</button>
                              }
                            </div>
                          </div>
                          <RangeInput rangeValue={referralPoints <= deet.claimTreshold ? (referralPoints/deet.claimTreshold) * 100 : 100} />
                        </div>
                      </div>
                    ))
                  }
                </div>
              }
              {
                currentView === 'earn' &&
                <div className="flex flex-col h-[60vh] overflow-y-scroll w-full py-3">
                  <div className="flex w-full justify-end">
                    <div className="w-auto cursor-pointer pr-6" onClick={() => setCurrentView('')}>
                      <TimesIconRed />
                    </div>
                  </div>
                  <div className="flex w-[90%] sm:w-[70%] md:w-[50%] mx-auto gap-2 my-3">
                    <p className="flex items-center justify-center text-white w-full font-bold">Earn</p>
                  </div>

                  <div className="flex w-[90%] justify-between mx-auto gap-2 my-3 border border-[#FFF] rounded-md p-2">
                    <p className="flex items-center justify-center text-white w-auto font-bold cursor-pointer rounded rounded-md p-1" style={socialsBg} onClick={() => setEarnView('socials')}>Socials</p>
                    <p className="flex items-center justify-center text-white w-auto font-bold cursor-pointer rounded rounded-md p-1" style={milestonesBg} onClick={() => setEarnView('milestones')}>Milestones</p>
                  </div>
                  
                  {
                    earnView === 'socials' &&
                    <>{
                      socialRewardDeets && socialRewardDeets.map((reward: any) => (
                        <>
                          {
                            reward.claimTreshold  === 'follow' &&
                            <div className="flex w-[90%] sm:w-[70%] md:w-[50%] mx-auto gap-2 my-3 rounded-md p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.56)'}}>
                              <div className="w-[10%]">
                                <img src={task} alt="Referral" className="w-[5vh]" />
                              </div>
                              <div className="w-[90%] flex flex-col">
                                <div className="flex justify-between">
                                  <div className="flex flex-col">
                                    <p className="text-white text-xs">Follow Twitter</p>
                                    <div className="flex">
                                      <div className="w-full text-xs text-[#E8BC6A]">1 extra spin</div>
                                    </div>
                                    <div className="flex">
                                      {
                                        reward.rewardClaimed ? 
                                        <></> :
                                         <button className="font-neuropol px-4 py-2 bg-[#00B806] text-white text-xs rounded" onClick={() => {
                                          setTimeout(() => {
                                            setEngageFollow(true)
                                          }, 60000)
                                          window.open('https://x.com/OmniPillar_?t=YWhC4VwPIqgwFaKEfmRvRQ&s=09', '_blank')
                                        }}>Engage</button>
                                      }                                     
                                    </div>
                                  </div>
                                  <div className="flex justify-center items-center">
                                    {
                                      engageFollow ? 
                                      <button className="font-neuropol px-4 py-2 bg-[#00B806] text-white text-xs rounded"  onClick={() => claimExtraSpins(1, 'follow')}>Claim</button>:
                                      reward.rewardClaimed ? 
                                      <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Completed</button> :
                                      <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Claim</button>
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          }

                          {
                            reward.claimTreshold  === 'like' &&
                            <div className="flex w-[90%] sm:w-[70%] md:w-[50%] mx-auto gap-2 my-3 rounded-md p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.56)'}}>
                              <div className="w-[10%]">
                                <img src={task} alt="Referral" className="w-[5vh]" />
                              </div>
                              <div className="w-[90%] flex flex-col">
                                <div className="flex justify-between">
                                  <div className="flex flex-col">
                                    <p className="text-white text-xs">Like Post On Twitter</p>
                                    <div className="flex">
                                      <div className="w-full text-xs text-[#E8BC6A]">1 extra spin</div>
                                    </div>
                                    <div className="flex">
                                      {
                                        reward.rewardClaimed ? 
                                        <></> :
                                        <button className="font-neuropol px-4 py-2 bg-[#00B806] text-white text-xs rounded" onClick={() => {
                                          setTimeout(() => {
                                            setEngageLike(true)
                                          }, 60000)
                                          window.open('https://x.com/OmniPillar_/status/1807726461480054789?s=19', '_blank')
                                        }}>Engage</button>
                                      }                                      
                                    </div>
                                  </div>
                                  <div className="flex justify-center items-center">
                                    {
                                      engageLike ? 
                                      <button className="font-neuropol px-4 py-2 bg-[#00B806] text-white text-xs rounded" onClick={() => claimExtraSpins(1, 'like')}>Claim</button>:
                                      reward.rewardClaimed ? 
                                      <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Completed</button> :
                                      <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Claim</button>
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          }

                          {
                            reward.claimTreshold  === 'repost' &&
                            <div className="flex w-[90%] sm:w-[70%] md:w-[50%] mx-auto gap-2 my-3 rounded-md p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.56)'}}>
                              <div className="w-[10%]">
                                <img src={task} alt="Referral" className="w-[5vh]" />
                              </div>
                              <div className="w-[90%] flex flex-col">
                                <div className="flex justify-between">
                                  <div className="flex flex-col">
                                    <p className="text-white text-xs">Repost on Twitter</p>
                                    <div className="flex">
                                      <div className="w-full text-xs text-[#E8BC6A]">1 extra spin</div>
                                    </div>
                                    <div className="flex">
                                      {
                                        reward.rewardClaimed ? 
                                        <></> :
                                        <button className="font-neuropol px-4 py-2 bg-[#00B806] text-white text-xs rounded" onClick={() => {
                                          setTimeout(() => {
                                            setEngageRepost(true)
                                          }, 60000)
                                          window.open('https://x.com/OmniPillar_/status/1807726461480054789?s=19', '_blank')
                                        }}>Engage</button>
                                      }
                                    </div>
                                  </div>
                                  <div className="flex justify-center items-center">
                                    {
                                      engageRepost ? 
                                      <button className="font-neuropol px-4 py-2 bg-[#00B806] text-white text-xs rounded" onClick={() => claimExtraSpins(1, 'repost')}>Claim</button>:
                                      reward.rewardClaimed ? 
                                      <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Completed</button> :
                                      <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Claim</button>
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          }

                          {
                            reward.claimTreshold  === 'telegram' &&
                            <div className="flex w-[90%] sm:w-[70%] md:w-[50%] mx-auto gap-2 my-3 rounded-md p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.56)'}}>
                              <div className="w-[10%]">
                                <img src={task} alt="Referral" className="w-[5vh]" />
                              </div>
                              <div className="w-[90%] flex flex-col">
                                <div className="flex justify-between">
                                  <div className="flex flex-col">
                                    <p className="text-white text-xs">Telegram Channel</p>
                                    <div className="flex">
                                      <div className="w-full text-xs text-[#E8BC6A]">1 extra spin</div>
                                    </div>
                                    <div className="flex">
                                      {
                                        reward.rewardClaimed ? 
                                        <></> :
                                        <button className="font-neuropol px-4 py-2 bg-[#00B806] text-white text-xs rounded" onClick={() => {
                                          setTimeout(() => {
                                            setEngageTelegram(true)
                                          }, 60000)
                                          window.open('https://t.me/omnipillar', '_blank')
                                        }}>Engage</button>
                                      }
                                    </div>
                                  </div>
                                  <div className="flex justify-center items-center">
                                    {
                                      engageTelegram ? 
                                      <button className="font-neuropol px-4 py-2 bg-[#00B806] text-white text-xs rounded"  onClick={() => claimExtraSpins(1, 'telegram')}>Claim</button>:
                                      reward.rewardClaimed ? 
                                      <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Completed</button> :
                                      <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Claim</button>
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          }

                          {
                            reward.claimTreshold  === 'discord' &&
                            <div className="flex w-[90%] sm:w-[70%] md:w-[50%] mx-auto gap-2 my-3 rounded-md p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.56)'}}>
                              <div className="w-[10%]">
                                <img src={task} alt="Referral" className="w-[5vh]" />
                              </div>
                              <div className="w-[90%] flex flex-col">
                                <div className="flex justify-between">
                                  <div className="flex flex-col">
                                    <p className="text-white text-xs">Discord</p>
                                    <div className="flex">
                                      <div className="w-full text-xs text-[#E8BC6A]">1 extra spin</div>
                                    </div>
                                    <div className="flex">
                                      {
                                        reward.rewardClaimed ? 
                                        <></> :
                                        <button className="font-neuropol px-4 py-2 bg-[#00B806] text-white text-xs rounded" onClick={() => {
                                          setTimeout(() => {
                                            setEngageDiscord(true)
                                          }, 60000)
                                          window.open('https://discord.com/invite/t2HZu25UxP', '_blank')
                                        }}>Engage</button>
                                      }
                                    </div>
                                  </div>
                                  <div className="flex justify-center items-center">
                                    {
                                      engageDiscord ? 
                                      <button className="font-neuropol px-4 py-2 bg-[#00B806] text-white text-xs rounded"  onClick={() => claimExtraSpins(1, 'discord')}>Claim</button>:
                                      reward.rewardClaimed ? 
                                      <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Completed</button> :
                                      <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Claim</button>
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                        </>
                      ))
                    }</>
                  }

                  {
                    earnView === 'milestones' &&
                    <>
                      <div className="flex w-[90%] sm:w-[70%] md:w-[50%] mx-auto gap-2 my-3 rounded-md p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.56)'}}>
                        <div className="w-[10%]">
                          <img src={task} alt="Referral" className="w-[5vh]" />
                        </div>
                        <div className="w-[90%] flex flex-col">
                          <div className="flex justify-between">
                            <div className="flex flex-col">
                              <p className="text-white text-xs">Complete 25 spin</p>
                              <div className="flex">
                                <div className="w-full text-xs text-[#E8BC6A]">100000 Gold</div>
                              </div>
                            </div>
                            <div className="flex justify-center items-center">
                              {
                                totalSpins >= 25 && lastTotalSpinClaim < 25 ?
                                <button className="font-neuropol px-4 py-2 bg-[#00B806] text-white text-xs rounded" onClick={() => setMilestoneRewardClaim(25, 100000)}>Claim</button> :
                                lastTotalSpinClaim >= 25 ?
                                <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Completed</button> :
                                <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Claim</button>
                              }
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex w-[90%] sm:w-[70%] md:w-[50%] mx-auto gap-2 my-3 rounded-md p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.56)'}}>
                        <div className="w-[10%]">
                          <img src={task} alt="Referral" className="w-[5vh]" />
                        </div>
                        <div className="w-[90%] flex flex-col">
                          <div className="flex justify-between">
                            <div className="flex flex-col">
                              <p className="text-white text-xs">Complete 50 spin</p>
                              <div className="flex">
                                <div className="w-full text-xs text-[#E8BC6A]">150000 Gold</div>
                              </div>
                            </div>
                            <div className="flex justify-center items-center">
                              {
                                totalSpins >= 50 && lastTotalSpinClaim < 50 ?
                                <button className="font-neuropol px-4 py-2 bg-[#00B806] text-white text-xs rounded" onClick={() => setMilestoneRewardClaim(50, 150000)}>Claim</button> :
                                lastTotalSpinClaim >= 50 ?
                                <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Completed</button> :
                                <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Claim</button>
                              }
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex w-[90%] sm:w-[70%] md:w-[50%] mx-auto gap-2 my-3 rounded-md p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.56)'}}>
                        <div className="w-[10%]">
                          <img src={task} alt="Referral" className="w-[5vh]" />
                        </div>
                        <div className="w-[90%] flex flex-col">
                          <div className="flex justify-between">
                            <div className="flex flex-col">
                              <p className="text-white text-xs">Complete 75 spin</p>
                              <div className="flex">
                                <div className="w-full text-xs text-[#E8BC6A]">200000 Gold</div>
                              </div>
                            </div>
                            <div className="flex justify-center items-center">
                              {
                                totalSpins >= 75 && lastTotalSpinClaim < 75 ?
                                <button className="font-neuropol px-4 py-2 bg-[#00B806] text-white text-xs rounded" onClick={() => setMilestoneRewardClaim(75, 200000)}>Claim</button> :
                                lastTotalSpinClaim >= 75 ?
                                <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Completed</button> :
                                <button className="font-neuropol px-4 py-2 text-white text-xs rounded"  style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} disabled>Claim</button>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                </div>
              }
              <div className="flex w-full py-2">
                <div className="flex flex-col gap-1 items-center justify-center cursor-pointer text-xs border-r-[#FFF] px-1 h-full text-[#FFF] w-1/3" onClick={() => {
                  setCurrentView('stats')
                }}>
                  <img src={badge} alt="Badge" className="w-[5vh]" />
                  <span>Stats</span>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center cursor-pointer text-xs px-1 h-full text-[#FFF] w-1/3" onClick={() => {
                  setCurrentView('referrals')
                }}>
                  <img src={referral} alt="Referral" className="w-[5vh]" />
                  <span>Invite</span>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center cursor-pointer text-xs px-1 h-full border-l-[#FFF] text-[#FFF] w-1/3" onClick={() => {
                  setCurrentView('earn')
                }}>
                  <img src={task} alt="Task" className="w-[5vh]" />
                  <span>Earn</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default AnimatedBackground;
