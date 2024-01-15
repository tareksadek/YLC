import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Header from '../../layout/Header'
import InfoBox from '../../components/Ui/InfoBox'
import PageTitle from '../../layout/PageTitle'

import { useLanguage } from '../../hooks/useLang'

import * as vars from '../../utilities/appVars'

import { privacyStyles } from './styles'
import { layoutStyles } from '../../theme/layout'

const PrivacyPolicy = ({ switchTheme }) => {
  const classes = privacyStyles()
  const layoutClasses = layoutStyles()
  const language = useLanguage()

  useEffect(() => {
    if (window.localStorage.getItem('originalTheme')) {
      switchTheme(window.localStorage.getItem('originalTheme'))
    }
  }, [switchTheme])

  return (
    <Box className={layoutClasses.pageContainer}>
      <Header title="Privacy Policy">
        <Box mb={3}>
          <InfoBox infoList={['This Privacy Policy describes how onedbc.app (the “Site” or “we”) collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.']} />
        </Box>
      </Header>
      <Box className={`${layoutClasses.contentContainer} ${classes.container}`}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="Consent"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                By using our website, you hereby consent to our Privacy Policy and agree to its terms.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="WHAT DO WE DO WITH YOUR INFORMATION"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                Email marketing: With your permission, we may send you emails about newly completed projects and other updates.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="CONSENT"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                <b>How do you get my consent?</b>
                <br />
                If we ask for your personal information we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.
                <br />
                <br />
                <b>How do I withdraw my consent?</b>
                <br />
                If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at anytime, by contacting us at
                &nbsp;
                <a href="mailto:info@onedbc.com">info@onedbc.com.</a>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="DISCLOSURE"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="THIRD-PARTY SERVICES"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                Certain content, products and services available via our Service may include materials from third-parties.
              </Typography>
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or
                &nbsp;
                evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites,
                &nbsp;
                or for any other materials, products, or services of third-parties.
              </Typography>
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in
                &nbsp;
                connection with any third-party websites. Please review carefully the third-party’s policies and practices and make sure you understand them before
                &nbsp;
                you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.
              </Typography>
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                <b>Links</b>
              </Typography>
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="SECURITY"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="AGE OF CONSENT"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of
                &nbsp;
                majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="CHANGES TO THIS PRIVACY POLICY"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will
                &nbsp;
                take effect immediately upon their posting on the website. If we make material changes to this policy,
                &nbsp;
                we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="PROHIBITED USES"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content:
                &nbsp;
                (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international,
                &nbsp;
                federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property
                &nbsp;
                rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or
                &nbsp;
                discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false
                &nbsp;
                or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way
                &nbsp;
                that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect
                &nbsp;
                or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or
                &nbsp;
                immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites,
                &nbsp;
                or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.
              </Typography>
              <br />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.
              </Typography>
              <br />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.
              </Typography>
              <br />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products
                &nbsp;
                and services delivered to you through the service are (except as expressly stated by us) provided ‘as is’ and ‘as available’
                &nbsp;
                for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied
                &nbsp;
                warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.
              </Typography>
              <br />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                In no case shall ONE, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or
                &nbsp;
                licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages
                &nbsp;
                of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages,
                &nbsp;
                whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products
                &nbsp;
                procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to,
                &nbsp;
                any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content
                &nbsp;
                (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or
                &nbsp;
                jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions,
                &nbsp;
                our liability shall be limited to the maximum extent permitted by law.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="INDEMNIFICATION"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                You agree to indemnify, defend and hold harmless ONE and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors,
                &nbsp;
                licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’
                &nbsp;
                fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference,
                &nbsp;
                or your violation of any law or the rights of a third-party.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="SEVERABILITY"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable,
                &nbsp;
                such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion
                &nbsp;
                shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="TERMINATION"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.
              </Typography>
              <br />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.
              </Typography>
              <br />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="ENTIRE AGREEMENT"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.
              </Typography>
              <br />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the
                &nbsp;
                entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous
                &nbsp;
                agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).
              </Typography>
              <br />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="CHANGES TO TERMS OF SERVICE"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                You can review the most current version of the Terms of Service at any time at this page.
              </Typography>
              <br />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service
                &nbsp;
                by posting updates and changes to our website. It is your responsibility to check our website periodically for changes.
                &nbsp;
                Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="QUESTIONS AND CONTACT INFORMATION"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or
                &nbsp;
                simply want more information contact our Privacy Compliance Officer at
                &nbsp;
                <a href="mailto:info@onedbc.com">info@onedbc.com.</a>
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography component="h4" variant="h4" className={`${classes.textSeparator} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
              Your rights
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="GDPR"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                If you are a resident of the EEA, you have the right to access the Personal Information we hold about you, to port it to a new service, and to ask that your Personal Information be corrected, updated, or erased.
                &nbsp;If you would like to exercise these rights, please contact us through the contact information below.
              </Typography>
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                Your Personal Information will be initially processed in Ireland and then will be transferred outside of Europe for storage and further processing, including to Canada and the United States.
                &nbsp;For more information on how data transfers comply with the GDPR.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="CCPA"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                If you are a resident of California, you have the right to access the Personal Information we hold about you (also known as the ‘Right to Know’), to port it to a new service,
                &nbsp;and to ask that your Personal Information be corrected, updated, or erased. If you would like to exercise these rights, please contact us through the contact information below.
              </Typography>
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                If you would like to designate an authorized agent to submit these requests on your behalf, please contact us at the address below.
                &nbsp;
                <a href={`mailto:${vars.CONTACT_EMAIL}`} target="_blank" rel="noreferrer">
                  {vars.CONTACT_EMAIL}
                </a>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="Cookies"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                A cookie is a small amount of information that’s downloaded to your computer or device when you visit our Site.
                &nbsp;We use a number of different cookies, including functional, performance, advertising, and social media or content cookies.
                &nbsp;Cookies make your browsing experience better by allowing the website to remember your actions and preferences (such as login and region selection).
                &nbsp;This means you don’t have to re-enter this information each time you return to the site or browse from one page to another.
                &nbsp;Cookies also provide information on how people use the website, for instance whether it’s their first time visiting or if they are a frequent visitor.
              </Typography>
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                We use the following cookies to optimize your experience on our Site and to provide our services.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="Cookies necessary for authentication"
              />
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="left">Function</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        __Secure-3PSIDCC
                      </TableCell>
                      <TableCell align="left">
                        Used for targeting purposes to build a profile of the website visitor&apos;s interests in order to show relevant & personalised Google advertising.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        SIDCC
                      </TableCell>
                      <TableCell align="left">
                        Security cookie to protect a user&apos;s data from unauthorized access
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        __Secure-1PSIDCC
                      </TableCell>
                      <TableCell align="left">
                        Store encrypted information to avoid the stored data in them being vulnerable to malicious attacks by third parties.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        __Secure-3PAPISID
                      </TableCell>
                      <TableCell align="left">
                        Builds a profile of website visitor interests to show relevant and personalized ads through retargeting by Google.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        SSID
                      </TableCell>
                      <TableCell align="left">
                        stores the preferences and other information of the user.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        __Secure-1PAPISID
                      </TableCell>
                      <TableCell align="left">
                        Builds a profile of website visitor interests to show relevant and personalized ads through retargeting by Google.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        HSID
                      </TableCell>
                      <TableCell align="left">
                        Contain digitally signed and encrypted records of a user&apos;s Google Account ID and most recent sign-in time.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        __Secure-3PSID
                      </TableCell>
                      <TableCell align="left">
                        Builds a profile of website visitor interests to show relevant and personalized ads through retargeting by Google.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        __Secure-1PSID
                      </TableCell>
                      <TableCell align="left">
                        Builds a profile of website visitor interests to show relevant and personalized ads through retargeting by Google.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        SID
                      </TableCell>
                      <TableCell align="left">
                        Contain digitally signed and encrypted records of a user&apos;s Google Account ID and most recent sign-in time.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        SAPISID
                      </TableCell>
                      <TableCell align="left">
                        Enable Google to collect user information for videos hosted by YouTube.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        APISID
                      </TableCell>
                      <TableCell align="left">
                        Used by Google to store user preferences and information when viewing pages with Google hosted content, such as YouTube or Google Maps.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        1P_JAR
                      </TableCell>
                      <TableCell align="left">
                        Security cookie to protect a user&apos;s data from unauthorized access. For more information about Google Analytics
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        NID
                      </TableCell>
                      <TableCell align="left">
                        Contains a unique ID Google uses to remember your preferences and other information, such as your preferred language
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        SEARCH_SAMESITE
                      </TableCell>
                      <TableCell align="left">
                        This cookie is used to prevent the browser from sending this cookie along with cross-site requests.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="Other cookies"
              />
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="left">Function</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        disclaimerCookie
                      </TableCell>
                      <TableCell align="left">
                        Accepting our cookie policy
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="Cookies time"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                The length of time that a cookie remains on your computer or mobile device depends on whether it is a “persistent” or “session” cookie.
                &nbsp;Session cookies last until you stop browsing and persistent cookies last until they expire or are deleted.
                &nbsp;Most of the cookies we use are persistent and will expire between 30 minutes and two years from the date they are downloaded to your device.
              </Typography>
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can negatively impact your user experience and parts of our
                &nbsp;website may no longer be fully accessible.
              </Typography>
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                Most browsers automatically accept cookies, but you can choose whether or not to accept cookies through your browser controls,
                &nbsp;often found in your browser’s “Tools” or “Preferences” menu. For more information on how to modify your browser settings or how to block,
                &nbsp;manage or filter cookies can be found in your browser’s help file or through such sites as www.allaboutcookies.org.
              </Typography>
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                Additionally, please note that blocking cookies may not completely prevent how we share information with third parties such as our advertising partners.
                &nbsp;To exercise your rights or opt-out of certain uses of your information by these parties, please follow the instructions in the “Behavioural Advertising” section above.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="Do not track"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                Please note that because there is no consistent industry understanding of how to respond to “Do Not Track” signals,
                &nbsp;we do not alter our data collection and usage practices when we detect such a signal from your browser.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="Changes"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="Contact"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at
                &nbsp;
                <a href={`mailto:${vars.CONTACT_EMAIL}`} target="_blank" rel="noreferrer">
                  {vars.CONTACT_EMAIL}
                </a>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle
                title="Last updated: July 18, 2022"
              />
              <Typography component="p" variant="body1" className={`${layoutClasses.panelText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                If you are not satisfied with our response to your complaint, you have the right to lodge your complaint with the relevant data protection authority. You can contact your local data protection authority.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

PrivacyPolicy.propTypes = {
  switchTheme: PropTypes.func.isRequired,
}

export default PrivacyPolicy
